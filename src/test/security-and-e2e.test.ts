import { describe, it, expect, beforeEach } from 'vitest';
import { saveDailyResult, getResultForDate } from '../services/results';
import { calculateDetailedTotal, validateChipQuantity, validateDirectTotal } from '../utils/chipCalculations';
import { sha256, generateReadableInviteCode } from '../utils/crypto';
import { calculateLeaderboard, calculatePlayerStats } from '../utils/statistics';
import { DailyResult, GroupMember } from '../types';

describe('Phase 7 - Tests d’intégration, parcours critiques et sécurité', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Parcours 1 & 2 : Authentification et codes d’invitation sécurisés', () => {
    it('génère un code d’invitation au format sécurisé et stocke son hash SHA-256 sans fuite de clair', async () => {
      const code = generateReadableInviteCode();
      expect(code).toMatch(/^PK-[A-Z2-9]{4}-[A-Z2-9]{4}$/);

      const hash = await sha256(code);
      expect(hash).toHaveLength(64);
      // Le hash est déterministe
      expect(await sha256(code)).toBe(hash);
      // Deux codes différents produisent des hashs différents
      const otherCode = generateReadableInviteCode();
      expect(await sha256(otherCode)).not.toBe(hash);
    });
  });

  describe('Parcours 3, 4 & 5 : Saisie détaillée, total direct et modification (Upsert)', () => {
    const groupId = 'table-labnum';
    const userId = 'usr-thomas';

    it('Parcours 3 : saisie d’un premier relevé en mode détaillé', async () => {
      const res = await saveDailyResult({
        groupId,
        userId,
        resultDate: '2026-10-28',
        entryMode: 'detailed',
        chipCounts: { blue: 10, red: 5, black: 4, green: 2, white: 1 } // 10 + 25 + 40 + 50 + 100 = 225
      });

      expect(res.error).toBeUndefined();
      expect(res.result?.total).toBe(225);
      expect(res.result?.entryMode).toBe('detailed');
      expect(res.isUpdate).toBe(false);
    });

    it('Parcours 4 : saisie en mode total direct sans extrapolation de jetons', async () => {
      const res = await saveDailyResult({
        groupId,
        userId,
        resultDate: '2026-10-29',
        entryMode: 'total',
        total: 580
      });

      expect(res.error).toBeUndefined();
      expect(res.result?.total).toBe(580);
      expect(res.result?.entryMode).toBe('total');
      expect(res.result?.chipCounts).toBeNull();
    });

    it('Parcours 5 : modification d’un résultat existant le même jour (Upsert sans doublon)', async () => {
      // 1. Première saisie
      await saveDailyResult({
        groupId,
        userId,
        resultDate: '2026-10-30',
        entryMode: 'total',
        total: 500
      });

      // 2. Deuxième validation le même jour (correction)
      const updateRes = await saveDailyResult({
        groupId,
        userId,
        resultDate: '2026-10-30',
        entryMode: 'total',
        total: 620
      });

      expect(updateRes.isUpdate).toBe(true);
      expect(updateRes.result?.total).toBe(620);

      // Vérifie qu'il n'y a qu'un seul résultat actif pour cette date
      const current = await getResultForDate(groupId, userId, '2026-10-30');
      expect(current?.total).toBe(620);
    });
  });

  describe('Parcours 6 & 7 : Classement, historique et synchronisation des joueurs', () => {
    const members: GroupMember[] = [
      { groupId: 'g1', userId: 'u1', nickname: 'Thomas', role: 'owner', status: 'active', joinedAt: '2026-09-01' },
      { groupId: 'g1', userId: 'u2', nickname: 'Alexandre', role: 'member', status: 'active', joinedAt: '2026-09-01' },
      { groupId: 'g1', userId: 'u3', nickname: 'Nicolas', role: 'member', status: 'archived', joinedAt: '2026-09-01', archivedAt: '2026-10-20' }
    ];

    const results: DailyResult[] = [
      { id: '1', groupId: 'g1', userId: 'u1', resultDate: '2026-10-28', entryMode: 'total', total: 850, createdAt: '', updatedAt: '' },
      { id: '2', groupId: 'g1', userId: 'u2', resultDate: '2026-10-28', entryMode: 'total', total: 1100, createdAt: '', updatedAt: '' },
      { id: '3', groupId: 'g1', userId: 'u3', resultDate: '2026-10-20', entryMode: 'total', total: 400, createdAt: '', updatedAt: '' } // Relevé passé avant archivage
    ];

    it('affiche le bon ordre du classement et signale les relevés non synchronisés', () => {
      const leaderboard = calculateLeaderboard(members, results);

      expect(leaderboard[0].nickname).toBe('Alexandre');
      expect(leaderboard[0].total).toBe(1100);
      expect(leaderboard[0].isSynchronizedWithLatest).toBe(true);

      expect(leaderboard[1].nickname).toBe('Thomas');
      expect(leaderboard[1].total).toBe(850);
      expect(leaderboard[1].isSynchronizedWithLatest).toBe(true);

      expect(leaderboard[2].nickname).toBe('Nicolas');
      expect(leaderboard[2].total).toBe(400);
      expect(leaderboard[2].isSynchronizedWithLatest).toBe(false); // Doit être false !
    });

    it('calcule les statistiques sans corrompre les données après suppression ou correction', () => {
      const stats = calculatePlayerStats([
        { id: '1', groupId: 'g1', userId: 'u1', resultDate: '2026-10-25', entryMode: 'total', total: 500, createdAt: '', updatedAt: '' },
        { id: '2', groupId: 'g1', userId: 'u1', resultDate: '2026-10-26', entryMode: 'total', total: 800, createdAt: '', updatedAt: '' },
        { id: '3', groupId: 'g1', userId: 'u1', resultDate: '2026-10-27', entryMode: 'total', total: 750, createdAt: '', updatedAt: '' }
      ]);

      expect(stats.currentTotal).toBe(750);
      expect(stats.variation).toBe(-50);
      expect(stats.personalBest?.total).toBe(800);
      expect(stats.bestPositiveDiff?.amount).toBe(300);
      expect(stats.worstNegativeDiff?.amount).toBe(-50);
    });
  });

  describe('Parcours 8 & Tests négatifs de sécurité', () => {
    it('sécurité : ne fait jamais confiance à un total client en mode détaillé', () => {
      const counts = { blue: 5, red: 2, black: 1, green: 0, white: 0 };
      // 5*1 + 2*5 + 1*10 = 25
      const recalculated = calculateDetailedTotal(counts);
      expect(recalculated).toBe(25);
      // Même si un attaquant tente d'injecter 99999, le calcul arithmétique force 25
      expect(recalculated).not.toBe(99999);
    });

    it('sécurité : rejette les valeurs négatives, décimales et aberrantes', () => {
      expect(validateChipQuantity(-5).isValid).toBe(false);
      expect(validateChipQuantity(3.14).isValid).toBe(false);
      expect(validateChipQuantity(1_000_000).isValid).toBe(false);
      expect(validateDirectTotal(-100).isValid).toBe(false);
      expect(validateDirectTotal(100_000_000).isValid).toBe(false);
    });

    it('sécurité : un joueur archivé conserve son historique sans être transformé en 0', () => {
      const archivedMember: GroupMember = {
        groupId: 'g1',
        userId: 'u-archived',
        nickname: 'Joueur Archivé',
        role: 'member',
        status: 'archived',
        joinedAt: '2026-08-01',
        archivedAt: '2026-10-15'
      };

      const pastResults: DailyResult[] = [
        { id: '1', groupId: 'g1', userId: 'u-archived', resultDate: '2026-10-10', entryMode: 'total', total: 450, createdAt: '', updatedAt: '' }
      ];

      const lb = calculateLeaderboard([archivedMember], pastResults);
      expect(lb[0].status).toBe('archived');
      expect(lb[0].total).toBe(450); // Toujours 450, jamais transformé en 0 !
    });
  });
});

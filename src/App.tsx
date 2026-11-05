import { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Card } from './components/common/Card';
import { Button } from './components/common/Button';
import { AuthModal } from './components/auth/AuthModal';
import { JoinOrCreateGroupModal } from './components/groups/JoinOrCreateGroupModal';
import { InviteModal } from './components/groups/InviteModal';
import { MemberList } from './components/groups/MemberList';
import { ChipEntryForm } from './components/results/ChipEntryForm';
import { PokerTrendChart } from './components/charts/PokerTrendChart';
import { PokerHandsGuide } from './components/poker/PokerHandsGuide';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { useAuth } from './context/AuthContext';
import { NavigationTab, GroupMember, DailyResult } from './types';
import { formatChips, formatVariation } from './utils/chipCalculations';
import { formatDateFr } from './utils/date';
import {
  calculatePlayerStats,
  calculateLeaderboard
} from './utils/statistics';
import {
  TrendingUp,
  TrendingDown,
  Award,
  Calendar,
  AlertCircle,
  Plus,
  ArrowRight,
  UserPlus
} from 'lucide-react';

const INITIAL_MEMBERS: (GroupMember & { chips: number })[] = [
  {
    groupId: 'demo-group',
    userId: 'user-1',
    nickname: 'Thomas',
    role: 'owner',
    status: 'active',
    joinedAt: '2026-10-01T10:00:00Z',
    chips: 845
  },
  {
    groupId: 'demo-group',
    userId: 'user-2',
    nickname: 'Alexandre',
    role: 'member',
    status: 'active',
    joinedAt: '2026-10-01T10:00:00Z',
    chips: 1120
  },
  {
    groupId: 'demo-group',
    userId: 'user-3',
    nickname: 'Sarah',
    role: 'member',
    status: 'active',
    joinedAt: '2026-10-05T10:00:00Z',
    chips: 790
  },
  {
    groupId: 'demo-group',
    userId: 'user-4',
    nickname: 'Julien',
    role: 'member',
    status: 'active',
    joinedAt: '2026-10-08T10:00:00Z',
    chips: 610
  },
  {
    groupId: 'demo-group',
    userId: 'user-5',
    nickname: 'Maxime',
    role: 'member',
    status: 'active',
    joinedAt: '2026-10-10T10:00:00Z',
    chips: 540
  },
  {
    groupId: 'demo-group',
    userId: 'user-6',
    nickname: 'Claire',
    role: 'member',
    status: 'active',
    joinedAt: '2026-10-12T10:00:00Z',
    chips: 480
  },
  {
    groupId: 'demo-group',
    userId: 'user-7',
    nickname: 'Nicolas',
    role: 'member',
    status: 'archived',
    joinedAt: '2026-10-01T10:00:00Z',
    archivedAt: '2026-10-22T18:00:00Z',
    chips: 350
  }
];

const INITIAL_RESULTS: DailyResult[] = [
  // Session du 20/10
  { id: 'r1', groupId: 'demo-group', userId: 'user-1', resultDate: '2026-10-20', entryMode: 'detailed', total: 600, createdAt: '', updatedAt: '' },
  { id: 'r2', groupId: 'demo-group', userId: 'user-2', resultDate: '2026-10-20', entryMode: 'total', total: 950, createdAt: '', updatedAt: '' },
  { id: 'r3', groupId: 'demo-group', userId: 'user-3', resultDate: '2026-10-20', entryMode: 'total', total: 700, createdAt: '', updatedAt: '' },
  { id: 'r4', groupId: 'demo-group', userId: 'user-7', resultDate: '2026-10-20', entryMode: 'total', total: 350, createdAt: '', updatedAt: '' },

  // Session du 21/10
  { id: 'r5', groupId: 'demo-group', userId: 'user-1', resultDate: '2026-10-21', entryMode: 'detailed', total: 720, createdAt: '', updatedAt: '' },
  { id: 'r6', groupId: 'demo-group', userId: 'user-2', resultDate: '2026-10-21', entryMode: 'total', total: 980, createdAt: '', updatedAt: '' },
  { id: 'r7', groupId: 'demo-group', userId: 'user-3', resultDate: '2026-10-21', entryMode: 'total', total: 680, createdAt: '', updatedAt: '' },
  { id: 'r8', groupId: 'demo-group', userId: 'user-4', resultDate: '2026-10-21', entryMode: 'total', total: 550, createdAt: '', updatedAt: '' },

  // Session du 23/10
  { id: 'r9', groupId: 'demo-group', userId: 'user-1', resultDate: '2026-10-23', entryMode: 'detailed', total: 650, createdAt: '', updatedAt: '' },
  { id: 'r10', groupId: 'demo-group', userId: 'user-2', resultDate: '2026-10-23', entryMode: 'total', total: 1040, createdAt: '', updatedAt: '' },
  { id: 'r11', groupId: 'demo-group', userId: 'user-3', resultDate: '2026-10-23', entryMode: 'total', total: 750, createdAt: '', updatedAt: '' },
  { id: 'r12', groupId: 'demo-group', userId: 'user-5', resultDate: '2026-10-23', entryMode: 'total', total: 500, createdAt: '', updatedAt: '' },

  // Session du 27/10
  { id: 'r13', groupId: 'demo-group', userId: 'user-1', resultDate: '2026-10-27', entryMode: 'detailed', total: 720, createdAt: '', updatedAt: '' },
  { id: 'r14', groupId: 'demo-group', userId: 'user-2', resultDate: '2026-10-27', entryMode: 'total', total: 1035, createdAt: '', updatedAt: '' },
  { id: 'r15', groupId: 'demo-group', userId: 'user-3', resultDate: '2026-10-27', entryMode: 'total', total: 830, createdAt: '', updatedAt: '' },
  { id: 'r16', groupId: 'demo-group', userId: 'user-4', resultDate: '2026-10-27', entryMode: 'total', total: 610, createdAt: '', updatedAt: '' },
  { id: 'r17', groupId: 'demo-group', userId: 'user-6', resultDate: '2026-10-27', entryMode: 'total', total: 480, createdAt: '', updatedAt: '' },

  // Session d'aujourd'hui (28/10)
  { id: 'r18', groupId: 'demo-group', userId: 'user-1', resultDate: '2026-10-28', entryMode: 'detailed', total: 845, createdAt: '', updatedAt: '' },
  { id: 'r19', groupId: 'demo-group', userId: 'user-2', resultDate: '2026-10-28', entryMode: 'total', total: 1120, createdAt: '', updatedAt: '' },
  { id: 'r20', groupId: 'demo-group', userId: 'user-3', resultDate: '2026-10-28', entryMode: 'total', total: 790, createdAt: '', updatedAt: '' },
  { id: 'r21', groupId: 'demo-group', userId: 'user-5', resultDate: '2026-10-28', entryMode: 'total', total: 540, createdAt: '', updatedAt: '' }
  // Julien (user-4) et Claire (user-6) n'ont pas encore fait leur relevé du 28/10 => Décalage réel !
];

export function App() {
  const { user, profile, currentGroup, membership, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  // Modales
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editDateForCount, setEditDateForCount] = useState<string | undefined>(undefined);

  // Données de travail
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [allResults, setAllResults] = useState<DailyResult[]>(INITIAL_RESULTS);

  const effectiveUserId = user?.id || 'user-1';
  const effectiveGroupId = currentGroup?.id || 'demo-group';
  const isOwner = membership?.role === 'owner' || (!membership && true);
  const userDisplayName = profile?.displayName || membership?.nickname || (user ? user.email?.split('@')[0] : 'Thomas');
  const groupDisplayName = currentGroup?.name || 'Table des Collègues';

  // Calcul dynamique des statistiques pour l'utilisateur actif
  const userResults = useMemo(
    () => allResults.filter((r) => r.userId === effectiveUserId),
    [allResults, effectiveUserId]
  );

  const userStats = useMemo(
    () => calculatePlayerStats(userResults),
    [userResults]
  );

  // Calcul dynamique du classement de la table
  const leaderboard = useMemo(
    () => calculateLeaderboard(members, allResults),
    [members, allResults]
  );

  const handleResultSaved = (savedResult: DailyResult) => {
    setAllResults((prev) => {
      const idx = prev.findIndex(
        (r) => r.groupId === savedResult.groupId && r.userId === savedResult.userId && r.resultDate === savedResult.resultDate
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = savedResult;
        return updated;
      }
      return [...prev, savedResult];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08140e] text-[#ecefed] pb-safe font-sans selection:bg-[#c5a059] selection:text-[#08140e]">
      {/* En-tête de table */}
      <Header
        groupName={groupDisplayName}
        userNickname={userDisplayName}
        isAuthenticated={Boolean(user)}
        isOwner={isOwner}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={signOut}
        onInviteClick={() => setIsInviteModalOpen(true)}
      />

      {/* Corps principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* =========================================================================
            ONGLET 1 : TABLEAU DE BORD
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <section className="space-y-6" aria-labelledby="dashboard-heading">
            <div className="flex items-baseline justify-between border-b border-[#1c3527] pb-3">
              <div>
                <h1 id="dashboard-heading" className="font-serif font-black text-xl sm:text-2xl text-[#f5ebd7] tracking-wider uppercase">
                  État de la Table
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Session en cours • {members.filter((m) => m.status === 'active').length} joueurs actifs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-medium text-[#dfba73] bg-[#0e2219] px-2.5 py-1 rounded border border-[#c5a059]/30">
                  {userStats.lastRecordDate ? formatDateFr(userStats.lastRecordDate) : '28/10/2026'}
                </span>
              </div>
            </div>

            {/* Bilan personnel - Données réelles */}
            <Card variant="brass" className="relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <span className="text-[11px] font-bold font-serif uppercase tracking-widest text-[#dfba73]">
                    Mon Tapis Actuel
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-1.5">
                    <span className="font-serif text-4xl sm:text-5xl font-black text-[#ffffff] tracking-tight">
                      {formatChips(userStats.currentTotal)}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">jetons</span>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg border ${
                        (userStats.variation ?? 0) > 0
                          ? 'text-emerald-400 bg-emerald-950/70 border-emerald-800/60'
                          : (userStats.variation ?? 0) < 0
                          ? 'text-red-400 bg-red-950/70 border-red-800/60'
                          : 'text-slate-300 bg-slate-900 border-slate-700'
                      }`}
                    >
                      {(userStats.variation ?? 0) >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 mr-1" />
                      )}
                      {formatVariation(userStats.variation)} vs session précédente
                    </span>

                    {userStats.lastRecordDate && (
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {formatDateFr(userStats.lastRecordDate)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setActiveTab('count')}
                    className="shadow-lg shadow-black/50"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Enregistrer mon stock
                  </Button>
                </div>
              </div>
            </Card>

            {/* Statistiques dérivées calculées à la volée */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card padding="sm" className="bg-[#0b1a13] border-[#183525]">
                <span className="text-[11px] font-medium text-slate-400">Record personnel</span>
                <p className="font-serif text-xl font-bold text-[#f5ebd7] mt-1">
                  {userStats.personalBest ? formatChips(userStats.personalBest.total) : '—'}
                </p>
                <span className="text-[10px] text-[#dfba73] flex items-center gap-1 mt-1 font-mono">
                  <Award className="w-3 h-3" />
                  {userStats.personalBest ? formatDateFr(userStats.personalBest.date) : 'Aucun'}
                </span>
              </Card>

              <Card padding="sm" className="bg-[#0b1a13] border-[#183525]">
                <span className="text-[11px] font-medium text-slate-400">Plus forte hausse</span>
                <p className="font-serif text-xl font-bold text-emerald-400 mt-1">
                  {userStats.bestPositiveDiff ? `+${userStats.bestPositiveDiff.amount}` : '—'}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                  {userStats.bestPositiveDiff ? formatDateFr(userStats.bestPositiveDiff.date) : 'Une session'}
                </span>
              </Card>

              <Card padding="sm" className="bg-[#0b1a13] border-[#183525]">
                <span className="text-[11px] font-medium text-slate-400">Plus forte baisse</span>
                <p className="font-serif text-xl font-bold text-red-400 mt-1">
                  {userStats.worstNegativeDiff ? userStats.worstNegativeDiff.amount : '—'}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                  {userStats.worstNegativeDiff ? formatDateFr(userStats.worstNegativeDiff.date) : 'Une session'}
                </span>
              </Card>

              <Card padding="sm" className="bg-[#0b1a13] border-[#183525]">
                <span className="text-[11px] font-medium text-slate-400">Relevés validés</span>
                <p className="font-serif text-xl font-bold text-slate-200 mt-1">
                  {userStats.totalEntries}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">Sessions suivies</span>
              </Card>
            </div>

            {/* Courbe collective Recharts (Données réelles sans interpolation fictive) */}
            <PokerTrendChart
              members={members}
              results={allResults}
              currentUserId={effectiveUserId}
            />

            {/* Classement de la table avec synchronisation apparente */}
            <Card className="bg-[#0b1a13] border-[#183525]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#183525]">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-[#f5ebd7] tracking-wider uppercase">
                    Classement de la table
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-[#0e2219] px-2 py-0.5 rounded border border-[#1b3d2c]">
                    {leaderboard.length} joueurs
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('players')}
                  className="text-xs text-[#dfba73] hover:text-[#f5ebd7] font-semibold flex items-center gap-1 transition-colors"
                >
                  Tous les membres <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                {leaderboard.map((player) => {
                  const isMe = player.userId === effectiveUserId;

                  return (
                    <div
                      key={player.userId}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                        isMe
                          ? 'bg-[#12281d] border-[#c5a059]/40'
                          : 'bg-[#08140e] border-[#183525] hover:border-[#224734]'
                      } ${player.status === 'archived' ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center font-serif font-black text-xs ${
                          player.rank === 1 ? 'text-[#dfba73]' : 'text-slate-400'
                        }`}>
                          #{player.rank}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-slate-100">{player.nickname}</p>
                            {isMe && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#dfba73] bg-[#c5a059]/15 px-1.5 py-0.2 rounded border border-[#c5a059]/30">
                                Moi
                              </span>
                            )}
                            {player.status === 'archived' && (
                              <span className="text-[9px] font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-700">
                                Archivé
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-400 font-mono">
                              {player.lastRecordDate ? formatDateFr(player.lastRecordDate) : 'Aucun relevé'}
                            </span>

                            {/* Signal explicite si les dates des derniers relevés diffèrent entre joueurs */}
                            {!player.isSynchronizedWithLatest && player.lastRecordDate && (
                              <span className="text-amber-400 text-[10px] flex items-center gap-0.5">
                                • <AlertCircle className="w-3 h-3" /> Relevé antérieur
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-serif font-black text-base text-[#ffffff]">
                          {formatChips(player.total)}
                        </p>
                        <span
                          className={`text-[11px] font-bold font-mono ${
                            (player.variation ?? 0) > 0
                              ? 'text-emerald-400'
                              : (player.variation ?? 0) < 0
                              ? 'text-red-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {formatVariation(player.variation)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>
        )}

        {/* =========================================================================
            ONGLET 2 : COMPTER (SAISIE DÉDIÉE DES JETONS)
           ========================================================================= */}
        {activeTab === 'count' && (
          <section className="space-y-6" aria-labelledby="count-heading">
            <ChipEntryForm
              groupId={effectiveGroupId}
              userId={effectiveUserId}
              timezone={currentGroup?.timezone || 'Europe/Paris'}
              initialDate={editDateForCount}
              onSaved={handleResultSaved}
            />
          </section>
        )}

        {/* =========================================================================
            ONGLET 3 : JOUEURS (MEMBRES ET GESTION)
           ========================================================================= */}
        {activeTab === 'players' && (
          <section className="space-y-6" aria-labelledby="players-heading">
            <div className="flex items-baseline justify-between border-b border-[#1c3527] pb-3">
              <div>
                <h1 id="players-heading" className="font-serif font-black text-xl sm:text-2xl text-[#f5ebd7] tracking-wider uppercase">
                  Membres de la Table
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gestion des profils et invitations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGroupModalOpen(true)}
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  Changer / Créer Table
                </Button>
              </div>
            </div>

            <MemberList
              members={members}
              currentUserId={effectiveUserId}
              isOwner={isOwner}
              groupId={effectiveGroupId}
              onInviteClick={() => setIsInviteModalOpen(true)}
              onMemberArchived={() => {
                setMembers((prev) =>
                  prev.map((m) =>
                    m.userId === 'user-4' ? { ...m, status: 'archived' } : m
                  )
                );
              }}
            />
          </section>
        )}

        {/* =========================================================================
            ONGLET 4 : MAINS (COMBINAISONS DE POKER)
           ========================================================================= */}
        {activeTab === 'hands' && (
          <section className="space-y-6" aria-labelledby="hands-heading">
            <PokerHandsGuide />
          </section>
        )}
      </main>

      {/* Barre de navigation basse */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modales d'authentification et gestion */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <JoinOrCreateGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        groupId={effectiveGroupId}
        userId={effectiveUserId}
      />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        group={currentGroup}
        membership={membership}
        userId={effectiveUserId}
        onProfileUpdated={() => {}}
        onNavigateToCount={(date) => {
          setEditDateForCount(date);
          setActiveTab('count');
        }}
      />
    </div>
  );
}

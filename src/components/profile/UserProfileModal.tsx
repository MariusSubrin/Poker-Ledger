import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UserProfile, Group, GroupMember, DailyResult } from '../../types';
import { updateMemberNickname, updateGroupSettings, getGroupInvitations, revokeInviteCode, GroupInvitationItem } from '../../services/groups';
import { getUserResults, deleteDailyResult } from '../../services/results';
import { upsertProfile } from '../../services/auth';
import { formatDateFr } from '../../utils/date';
import { formatChips } from '../../utils/chipCalculations';
import {
  X,
  User,
  Settings,
  History,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Ban,
  Save
} from 'lucide-react';

export interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  group: Group | null;
  membership: GroupMember | null;
  userId: string;
  onProfileUpdated?: () => void;
  onNavigateToCount?: (dateToEdit?: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  group,
  membership,
  userId,
  onProfileUpdated,
  onNavigateToCount
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'admin'>('profile');

  // Formulaire profil
  const [nickname, setNickname] = useState(membership?.nickname || profile?.displayName || 'Joueur');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Formulaire admin groupe
  const [groupName, setGroupName] = useState(group?.name || 'Table des Collègues');
  const [groupTimezone, setGroupTimezone] = useState(group?.timezone || 'Europe/Paris');
  const [invitations, setInvitations] = useState<GroupInvitationItem[]>([]);
  const [isSavingGroup, setIsSavingGroup] = useState(false);

  // Historique des relevés
  const [historyResults, setHistoryResults] = useState<DailyResult[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isOwner = membership?.role === 'owner' || (!membership && true);

  useEffect(() => {
    if (membership?.nickname) setNickname(membership.nickname);
    else if (profile?.displayName) setNickname(profile.displayName);
    if (group?.name) setGroupName(group.name);
    if (group?.timezone) setGroupTimezone(group.timezone);
  }, [membership, profile, group]);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    async function loadData() {
      if (group?.id) {
        setIsLoadingHistory(true);
        const results = await getUserResults(group.id, userId);
        if (isMounted) {
          setHistoryResults(results);
          setIsLoadingHistory(false);
        }

        if (isOwner) {
          const invList = await getGroupInvitations(group.id);
          if (isMounted) {
            setInvitations(invList);
          }
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [isOpen, group?.id, userId, isOwner]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSavingProfile(true);

    try {
      if (group?.id) {
        await updateMemberNickname(group.id, userId, nickname);
      }
      await upsertProfile(userId, nickname);

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès.' });
      if (onProfileUpdated) onProfileUpdated();
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Erreur de mise à jour' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveGroupSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!group?.id) return;
    setMessage(null);
    setIsSavingGroup(true);

    try {
      await updateGroupSettings(group.id, groupName, groupTimezone);
      setMessage({ type: 'success', text: 'Paramètres de la table enregistrés.' });
      if (onProfileUpdated) onProfileUpdated();
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Erreur de sauvegarde' });
    } finally {
      setIsSavingGroup(false);
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      await revokeInviteCode(invitationId);
      if (group?.id) {
        const updated = await getGroupInvitations(group.id);
        setInvitations(updated);
      }
      setMessage({ type: 'success', text: 'Invitation révoquée.' });
    } catch {
      setMessage({ type: 'error', text: 'Impossible de révoquer l’invitation.' });
    }
  };

  const handleDeleteResult = async (resultId: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce relevé ? Cette action est irréversible.')) {
      return;
    }
    setDeletingId(resultId);
    try {
      await deleteDailyResult(resultId);
      setHistoryResults((prev) => prev.filter((r) => r.id !== resultId));
      setMessage({ type: 'success', text: 'Relevé supprimé avec succès.' });
      if (onProfileUpdated) onProfileUpdated();
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression.' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <Card variant="brass" className="w-full max-w-lg relative p-6 bg-[#0b1a13] max-h-[90vh] flex flex-col">
        {/* Bouton Fermer */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#08140e] border border-[#1b3d2c]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* En-tête profil */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#183525]">
          <div className="w-12 h-12 rounded-full bg-[#08140e] border border-[#c5a059]/40 flex items-center justify-center font-serif font-black text-base text-[#dfba73] shadow-md">
            {nickname.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="font-serif font-black text-lg text-[#f5ebd7] tracking-wider uppercase">
              {nickname}
            </h2>
            <p className="text-xs text-slate-400">
              {membership?.role === 'owner' ? 'Propriétaire de table' : 'Membre actif'} • {group?.name || 'Table des Collègues'}
            </p>
          </div>
        </div>

        {/* Onglets de navigation dans la modale */}
        <div className="flex border-b border-[#183525] my-4 gap-4 text-xs font-serif font-bold uppercase tracking-wider">
          <button
            onClick={() => { setActiveTab('profile'); setMessage(null); }}
            className={`pb-2.5 transition-colors border-b-2 -mb-[1px] flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'border-[#dfba73] text-[#dfba73]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Mon Profil
          </button>
          <button
            onClick={() => { setActiveTab('history'); setMessage(null); }}
            className={`pb-2.5 transition-colors border-b-2 -mb-[1px] flex items-center gap-1.5 ${
              activeTab === 'history' ? 'border-[#dfba73] text-[#dfba73]' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" /> Mes Relevés ({historyResults.length})
          </button>
          {isOwner && (
            <button
              onClick={() => { setActiveTab('admin'); setMessage(null); }}
              className={`pb-2.5 transition-colors border-b-2 -mb-[1px] flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'border-[#dfba73] text-[#dfba73]' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Administration
            </button>
          )}
        </div>

        {/* Message de notification */}
        {message && (
          <div
            className={`mb-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-800/60 text-emerald-300'
                : 'bg-red-950/70 border border-red-800/60 text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Corps d'onglet avec défilement */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* ONGLET 1 : MON PROFIL */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="profile-nickname" className="block text-xs font-semibold text-slate-300 mb-1">
                  Pseudo à la table
                </label>
                <input
                  id="profile-nickname"
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#08140e] border border-[#1b3d2c] text-sm text-white focus:outline-none focus:border-[#c5a059]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Ce nom sera visible par tous les joueurs dans le classement et les relevés.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#08140e] border border-[#183525] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rôle :</span>
                  <span className="font-bold text-[#dfba73] capitalize">{membership?.role || 'Membre'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Statut :</span>
                  <span className="font-bold text-emerald-400">Actif</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Table actuelle :</span>
                  <span className="text-white font-medium">{group?.name || 'Table des Collègues'}</span>
                </div>
                {membership?.joinedAt && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Membre depuis :</span>
                    <span className="text-slate-300 font-mono">{formatDateFr(membership.joinedAt.slice(0, 10))}</span>
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" fullWidth size="md" disabled={isSavingProfile}>
                <Save className="w-4 h-4 mr-1.5" />
                {isSavingProfile ? 'Enregistrement...' : 'Mettre à jour mon profil'}
              </Button>
            </form>
          )}

          {/* ONGLET 2 : HISTORIQUE PERSONNEL & ÉDITION/SUPPRESSION */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Consultez, corrigez ou supprimez vos relevés passés. Vos modifications mettent automatiquement à jour le graphique et les records.
              </p>

              {isLoadingHistory ? (
                <div className="p-6 text-center text-xs text-slate-400">Chargement de vos relevés...</div>
              ) : historyResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-[#08140e] rounded-xl border border-[#1b3d2c]">
                  Aucun relevé enregistré pour le moment.
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {historyResults.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl bg-[#08140e] border border-[#183525] flex items-center justify-between gap-3 hover:border-[#224734] transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#dfba73]" />
                            {formatDateFr(res.resultDate)}
                          </span>
                          <span className="text-[10px] text-[#dfba73] bg-[#0e2219] px-1.5 py-0.2 rounded border border-[#c5a059]/30">
                            {res.entryMode === 'detailed' ? 'Détaillé' : 'Direct'}
                          </span>
                        </div>
                        <p className="font-serif font-black text-sm text-[#f5ebd7]">
                          {formatChips(res.total)} <span className="text-[10px] text-slate-400 font-sans font-normal">jetons</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {onNavigateToCount && (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onNavigateToCount(res.resultDate);
                            }}
                            title="Corriger ce relevé"
                            className="px-2.5 py-1 text-[11px] font-semibold text-[#dfba73] hover:text-white bg-[#132c20] border border-[#1f4734] rounded-lg transition-colors"
                          >
                            Modifier
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteResult(res.id)}
                          disabled={deletingId === res.id}
                          title="Supprimer ce relevé"
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-[#1a0f0f] border border-transparent hover:border-red-900/60 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ONGLET 3 : ADMINISTRATION (PROPRIÉTAIRE SEULEMENT) */}
          {activeTab === 'admin' && isOwner && (
            <div className="space-y-5">
              {/* Paramètres de la table */}
              <form onSubmit={handleSaveGroupSettings} className="space-y-3 p-3.5 rounded-xl bg-[#08140e] border border-[#183525]">
                <span className="text-xs font-serif font-bold text-[#dfba73] uppercase tracking-wider block">
                  Configuration de la table
                </span>

                <div>
                  <label htmlFor="group-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Nom de la table
                  </label>
                  <input
                    id="group-name"
                    type="text"
                    required
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1a13] border border-[#1b3d2c] text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label htmlFor="group-tz" className="block text-xs font-semibold text-slate-300 mb-1">
                    Fuseau horaire de référence
                  </label>
                  <select
                    id="group-tz"
                    value={groupTimezone}
                    onChange={(e) => setGroupTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0b1a13] border border-[#1b3d2c] text-sm text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Europe/Paris">Europe/Paris (UTC+1 / UTC+2)</option>
                    <option value="Europe/London">Europe/London (UTC+0 / UTC+1)</option>
                    <option value="America/Montreal">America/Montreal (UTC-5 / UTC-4)</option>
                    <option value="UTC">UTC standard</option>
                  </select>
                </div>

                <Button type="submit" variant="primary" size="sm" disabled={isSavingGroup} className="mt-1">
                  Enregistrer les paramètres
                </Button>
              </form>

              {/* Gestion des invitations actives */}
              <div className="space-y-3">
                <span className="text-xs font-serif font-bold text-[#dfba73] uppercase tracking-wider block">
                  Invitations en cours
                </span>

                {invitations.length === 0 ? (
                  <p className="text-xs text-slate-400 bg-[#08140e] p-3 rounded-xl border border-[#1b3d2c]">
                    Aucune invitation générée pour cette table.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {invitations.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-3 rounded-xl bg-[#08140e] border border-[#183525] flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-slate-200 font-bold">
                            <Clock className="w-3.5 h-3.5 text-[#dfba73]" />
                            <span>Expire le {formatDateFr(inv.expiresAt.slice(0, 10))}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {inv.usesCount} / {inv.maxUses} utilisation(s)
                            {inv.isRevoked && <span className="text-red-400 ml-1.5 font-bold">• Révoquée</span>}
                            {inv.isExpired && !inv.isRevoked && <span className="text-amber-400 ml-1.5 font-bold">• Expirée</span>}
                          </p>
                        </div>

                        {!inv.isRevoked && !inv.isExpired && (
                          <button
                            type="button"
                            onClick={() => handleRevokeInvitation(inv.id)}
                            className="px-2 py-1 rounded bg-red-950/70 border border-red-800 text-red-300 hover:text-white hover:bg-red-900 transition-colors flex items-center gap-1 text-[11px]"
                          >
                            <Ban className="w-3 h-3" /> Révoquer
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

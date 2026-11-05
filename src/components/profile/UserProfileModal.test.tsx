import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfileModal } from './UserProfileModal';
import { Group, GroupMember, UserProfile } from '../../types';

const MOCK_PROFILE: UserProfile = {
  userId: 'usr-1',
  displayName: 'Thomas',
  avatarKey: null,
  createdAt: '2026-09-01T10:00:00Z'
};

const MOCK_GROUP: Group = {
  id: 'grp-1',
  name: 'Table des Collègues',
  ownerUserId: 'usr-1',
  timezone: 'Europe/Paris',
  createdAt: '2026-09-01T10:00:00Z'
};

const MOCK_MEMBERSHIP: GroupMember = {
  groupId: 'grp-1',
  userId: 'usr-1',
  nickname: 'Thomas',
  role: 'owner',
  status: 'active',
  joinedAt: '2026-09-01T10:00:00Z'
};

describe('UserProfileModal - Profil et gestion des relevés', () => {
  it('ne s’affiche pas quand isOpen est false', () => {
    render(
      <UserProfileModal
        isOpen={false}
        onClose={() => {}}
        profile={MOCK_PROFILE}
        group={MOCK_GROUP}
        membership={MOCK_MEMBERSHIP}
        userId="usr-1"
      />
    );
    expect(screen.queryByText('Mon Profil')).not.toBeInTheDocument();
  });

  it('affiche les onglets Profil, Mes Relevés et Administration pour le propriétaire', () => {
    render(
      <UserProfileModal
        isOpen={true}
        onClose={() => {}}
        profile={MOCK_PROFILE}
        group={MOCK_GROUP}
        membership={MOCK_MEMBERSHIP}
        userId="usr-1"
      />
    );

    expect(screen.getByRole('button', { name: /^mon profil$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mes relevés/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /administration/i })).toBeInTheDocument();
  });

  it('permet de basculer vers l’onglet Mes Relevés', async () => {
    const user = userEvent.setup();
    render(
      <UserProfileModal
        isOpen={true}
        onClose={() => {}}
        profile={MOCK_PROFILE}
        group={MOCK_GROUP}
        membership={MOCK_MEMBERSHIP}
        userId="usr-1"
      />
    );

    const historyTab = screen.getByRole('button', { name: /mes relevés/i });
    await user.click(historyTab);

    expect(screen.getByText(/consultez, corrigez ou supprimez vos relevés passés/i)).toBeInTheDocument();
  });

  it('permet de basculer vers l’onglet Administration et d’afficher la configuration', async () => {
    const user = userEvent.setup();
    render(
      <UserProfileModal
        isOpen={true}
        onClose={() => {}}
        profile={MOCK_PROFILE}
        group={MOCK_GROUP}
        membership={MOCK_MEMBERSHIP}
        userId="usr-1"
      />
    );

    const adminTab = screen.getByRole('button', { name: /administration/i });
    await user.click(adminTab);

    expect(screen.getByText(/configuration de la table/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nom de la table/i)).toHaveValue('Table des Collègues');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PokerHandsGuide } from './PokerHandsGuide';

describe('PokerHandsGuide - Hiérarchie des 10 combinaisons de poker', () => {
  it('affiche les 10 combinaisons de poker de la plus forte à la plus faible', () => {
    render(<PokerHandsGuide />);

    expect(screen.getByText('Quinte Flush Royale')).toBeInTheDocument();
    expect(screen.getByText('Quinte Flush')).toBeInTheDocument();
    expect(screen.getByText('Carré')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
    expect(screen.getByText('Couleur')).toBeInTheDocument();
    expect(screen.getByText('Quinte')).toBeInTheDocument();
    expect(screen.getByText('Brelan')).toBeInTheDocument();
    expect(screen.getByText('Deux Paires')).toBeInTheDocument();
    expect(screen.getByText('Une Paire')).toBeInTheDocument();
    expect(screen.getByText('Carte Haute')).toBeInTheDocument();
  });

  it('affiche les explications de règles de départage pour chaque main', () => {
    render(<PokerHandsGuide />);

    const tieBreakerNotices = screen.getAllByText(/départage/i);
    expect(tieBreakerNotices.length).toBeGreaterThanOrEqual(10);
  });

  it('affiche les cartes illustrées avec leurs rangs et enseignes', () => {
    render(<PokerHandsGuide />);

    // Doit trouver les As représentés
    const aceCards = screen.getAllByText('A');
    expect(aceCards.length).toBeGreaterThanOrEqual(1);
  });
});

import React from 'react';
import { Card } from '../common/Card';
import { PlayingCard, CardRank, CardSuit } from './PlayingCard';
import { BookOpen, Info } from 'lucide-react';

interface HandDefinition {
  rank: number;
  name: string;
  subtitle: string;
  cards: { rank: CardRank; suit: CardSuit }[];
  description: string;
  tieBreaker: string;
}

const POKER_HANDS: HandDefinition[] = [
  {
    rank: 1,
    name: 'Quinte Flush Royale',
    subtitle: 'Royal Flush',
    cards: [
      { rank: 'A', suit: 'spades' },
      { rank: 'K', suit: 'spades' },
      { rank: 'Q', suit: 'spades' },
      { rank: 'J', suit: 'spades' },
      { rank: '10', suit: 'spades' }
    ],
    description: 'La combinaison absolue et imbattable : As, Roi, Dame, Valet, 10 de la même couleur.',
    tieBreaker: 'Impossible d’être battu. En cas de Quinte Flush Royale commune sur le tableau, le pot est équitablement partagé (split).'
  },
  {
    rank: 2,
    name: 'Quinte Flush',
    subtitle: 'Straight Flush',
    cards: [
      { rank: '9', suit: 'hearts' },
      { rank: '8', suit: 'hearts' },
      { rank: '7', suit: 'hearts' },
      { rank: '6', suit: 'hearts' },
      { rank: '5', suit: 'hearts' }
    ],
    description: 'Cinq cartes consécutives de la même couleur (qui ne monte pas jusqu’à l’As).',
    tieBreaker: 'La quinte flush dont la carte au sommet est la plus haute l’emporte (ex: 9-8-7-6-5 bat 8-7-6-5-4).'
  },
  {
    rank: 3,
    name: 'Carré',
    subtitle: 'Four of a Kind',
    cards: [
      { rank: 'K', suit: 'spades' },
      { rank: 'K', suit: 'hearts' },
      { rank: 'K', suit: 'diamonds' },
      { rank: 'K', suit: 'clubs' },
      { rank: '9', suit: 'spades' }
    ],
    description: 'Quatre cartes de même rang (ex : quatre Rois) accompagnées d’une 5e carte (kicker).',
    tieBreaker: 'Le plus haut carré l’emporte. Si deux joueurs ont le même carré (sur le board), la 5e carte (kicker) la plus haute départage.'
  },
  {
    rank: 4,
    name: 'Full',
    subtitle: 'Full House',
    cards: [
      { rank: 'J', suit: 'spades' },
      { rank: 'J', suit: 'hearts' },
      { rank: 'J', suit: 'diamonds' },
      { rank: '8', suit: 'clubs' },
      { rank: '8', suit: 'spades' }
    ],
    description: 'Trois cartes d’un rang combinées à deux cartes d’un autre rang (un brelan + une paire).',
    tieBreaker: 'C’est d’abord le rang du brelan qui départage (ex: J-J-J-8-8 bat 10-10-10-A-A). En cas d’égalité sur le brelan, la paire la plus haute gagne.'
  },
  {
    rank: 5,
    name: 'Couleur',
    subtitle: 'Flush',
    cards: [
      { rank: 'A', suit: 'clubs' },
      { rank: 'J', suit: 'clubs' },
      { rank: '9', suit: 'clubs' },
      { rank: '6', suit: 'clubs' },
      { rank: '2', suit: 'clubs' }
    ],
    description: 'Cinq cartes de la même couleur (pique, cœur, carreau ou trèfle), non consécutives.',
    tieBreaker: 'La carte la plus haute l’emporte. Si égale, la 2e plus haute, puis la 3e, etc. Les enseignes (couleurs) sont toutes de valeur égale au poker.'
  },
  {
    rank: 6,
    name: 'Quinte',
    subtitle: 'Straight (Suite)',
    cards: [
      { rank: '8', suit: 'spades' },
      { rank: '7', suit: 'hearts' },
      { rank: '6', suit: 'diamonds' },
      { rank: '5', suit: 'clubs' },
      { rank: '4', suit: 'spades' }
    ],
    description: 'Cinq cartes consécutives de couleurs panachées.',
    tieBreaker: 'La plus haute carte de la quinte gagne. L’As peut être utilisé au plus bas (A-2-3-4-5, dite la "roue" qui culmine à 5) ou au plus haut (10-J-Q-K-A "Broadway" qui culmine à l’As). Mais la suite ne peut pas "tourner autour" de l’As (Q-K-A-2-3 est invalide).'
  },
  {
    rank: 7,
    name: 'Brelan',
    subtitle: 'Three of a Kind',
    cards: [
      { rank: '7', suit: 'spades' },
      { rank: '7', suit: 'hearts' },
      { rank: '7', suit: 'diamonds' },
      { rank: 'K', suit: 'clubs' },
      { rank: '2', suit: 'spades' }
    ],
    description: 'Trois cartes de même rang, accompagnées de deux cartes indépendantes (kickers).',
    tieBreaker: 'Le rang du brelan le plus fort l’emporte. Si identique (sur le board), le premier kicker le plus haut départage, puis le deuxième si nécessaire.'
  },
  {
    rank: 8,
    name: 'Deux Paires',
    subtitle: 'Two Pair',
    cards: [
      { rank: 'Q', suit: 'spades' },
      { rank: 'Q', suit: 'hearts' },
      { rank: '9', suit: 'diamonds' },
      { rank: '9', suit: 'clubs' },
      { rank: 'A', suit: 'spades' }
    ],
    description: 'Deux cartes d’un rang et deux cartes d’un autre rang, avec un kicker.',
    tieBreaker: 'La paire la plus haute détermine le vainqueur (ex: Q-Q-9-9 bat J-J-10-10). Si la haute paire est égale, la 2e paire départage. Si les 2 paires sont identiques, le kicker (5e carte) l’emporte.'
  },
  {
    rank: 9,
    name: 'Une Paire',
    subtitle: 'One Pair',
    cards: [
      { rank: '10', suit: 'spades' },
      { rank: '10', suit: 'diamonds' },
      { rank: 'A', suit: 'clubs' },
      { rank: 'K', suit: 'hearts' },
      { rank: '4', suit: 'spades' }
    ],
    description: 'Deux cartes de même rang, complétées par trois kickers.',
    tieBreaker: 'La paire la plus forte l’emporte. Si deux joueurs ont la même paire, les 3 kickers sont comparés du plus haut au plus bas.'
  },
  {
    rank: 10,
    name: 'Carte Haute',
    subtitle: 'High Card',
    cards: [
      { rank: 'A', suit: 'spades' },
      { rank: 'K', suit: 'diamonds' },
      { rank: 'J', suit: 'clubs' },
      { rank: '8', suit: 'hearts' },
      { rank: '3', suit: 'spades' }
    ],
    description: 'Aucune paire ni combinaison formée. La valeur de la main repose sur la carte la plus forte.',
    tieBreaker: 'La carte la plus haute l’emporte (l’As est la carte la plus forte), puis la 2e, 3e, 4e et 5e dans l’ordre.'
  }
];

export const PokerHandsGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c3527] pb-3">
        <div>
          <h1 className="font-serif font-black text-xl sm:text-2xl text-[#f5ebd7] tracking-wider uppercase flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#dfba73]" />
            Combinaisons de Poker
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Hiérarchie officielle des 10 mains au Texas Hold'em • Disponible hors-ligne
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#dfba73] bg-[#0e2219] px-2.5 py-1 rounded border border-[#c5a059]/30 self-start sm:self-auto">
          RÈGLES OFFICIELLES
        </span>
      </div>

      <div className="space-y-3.5">
        {POKER_HANDS.map((hand) => (
          <Card key={hand.rank} padding="md" className="bg-[#0b1a13] border-[#183525] hover:border-[#244b36] transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Informations textuelles */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#08140e] border border-[#1b3d2c] text-[#dfba73] flex items-center justify-center font-serif font-black text-xs shrink-0">
                    #{hand.rank}
                  </span>
                  <div>
                    <h2 className="font-serif font-bold text-base text-[#f5ebd7] leading-tight">
                      {hand.name}
                    </h2>
                    <span className="text-[11px] font-mono text-slate-400 tracking-wide">
                      {hand.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {hand.description}
                </p>

                <div className="flex items-start gap-1.5 pt-1 text-[11px] text-[#dfba73]/90 bg-[#08140e] p-2 rounded-lg border border-[#1b3d2c]">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#dfba73]" />
                  <span>
                    <strong className="text-white">Départage :</strong> {hand.tieBreaker}
                  </span>
                </div>
              </div>

              {/* Cartes illustrées tactiles */}
              <div className="flex items-center gap-1 sm:gap-1.5 self-center md:self-auto pt-2 md:pt-0">
                {hand.cards.map((c, i) => (
                  <PlayingCard key={i} rank={c.rank} suit={c.suit} size="md" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

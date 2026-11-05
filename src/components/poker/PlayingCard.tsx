import React from 'react';
import { clsx } from 'clsx';

export type CardSuit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type CardRank = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export interface PlayingCardProps {
  rank: CardRank;
  suit: CardSuit;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SUIT_ICONS: Record<CardSuit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣'
};

const SUIT_COLORS: Record<CardSuit, string> = {
  spades: 'text-slate-900',
  hearts: 'text-red-600',
  diamonds: 'text-red-600',
  clubs: 'text-slate-900'
};

const SIZES = {
  sm: 'w-7 h-10 text-[10px] p-0.5 rounded',
  md: 'w-10 h-14 text-xs p-1 rounded-md',
  lg: 'w-12 h-18 text-sm p-1.5 rounded-lg'
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  rank,
  suit,
  size = 'md',
  className
}) => {
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const suitIcon = SUIT_ICONS[suit];
  const suitColor = SUIT_COLORS[suit];

  return (
    <div
      className={clsx(
        'relative bg-white text-slate-900 font-bold border border-slate-300 shadow-md flex flex-col justify-between select-none shrink-0 transition-transform hover:-translate-y-0.5',
        SIZES[size],
        className
      )}
    >
      {/* Coin supérieur gauche */}
      <div className={clsx('flex flex-col items-center leading-none', isRed ? 'text-red-600' : 'text-slate-900')}>
        <span className="font-serif font-black">{rank}</span>
        <span className="text-[10px] leading-tight">{suitIcon}</span>
      </div>

      {/* Symbole central */}
      <div className={clsx('absolute inset-0 flex items-center justify-center pointer-events-none', suitColor)}>
        <span className={clsx(size === 'sm' ? 'text-xs' : size === 'md' ? 'text-base' : 'text-xl')}>
          {suitIcon}
        </span>
      </div>

      {/* Coin inférieur droit (inversé) */}
      <div className={clsx('flex flex-col items-center leading-none rotate-180', isRed ? 'text-red-600' : 'text-slate-900')}>
        <span className="font-serif font-black">{rank}</span>
        <span className="text-[10px] leading-tight">{suitIcon}</span>
      </div>
    </div>
  );
};

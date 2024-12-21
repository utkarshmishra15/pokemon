'use client';

import { PokemonCardProps } from '@/types/pokemon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:scale-105">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
          <span className="text-sm text-muted-foreground">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-secondary/20">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <Badge
              key={type}
              className={cn(
                'capitalize text-white',
                typeColors[type] || 'bg-gray-500'
              )}
            >
              {type}
            </Badge>
          ))}
        </div>
        {pokemon.stats && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">HP</span>
              <Progress value={pokemon.stats.hp} max={255} className="w-2/3" />
              <span className="text-sm">{pokemon.stats.hp}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ATK</span>
              <Progress value={pokemon.stats.attack} max={255} className="w-2/3" />
              <span className="text-sm">{pokemon.stats.attack}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">DEF</span>
              <Progress value={pokemon.stats.defense} max={255} className="w-2/3" />
              <span className="text-sm">{pokemon.stats.defense}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SPD</span>
              <Progress value={pokemon.stats.speed} max={255} className="w-2/3" />
              <span className="text-sm">{pokemon.stats.speed}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
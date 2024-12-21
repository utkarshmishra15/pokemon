'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PokemonType, PokemonTypeFilterProps } from '@/types/pokemon';
import { cn } from '@/lib/utils';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400 hover:bg-gray-500',
  fire: 'bg-red-500 hover:bg-red-600',
  water: 'bg-blue-500 hover:bg-blue-600',
  electric: 'bg-yellow-400 hover:bg-yellow-500',
  grass: 'bg-green-500 hover:bg-green-600',
  ice: 'bg-blue-200 hover:bg-blue-300',
  fighting: 'bg-red-700 hover:bg-red-800',
  poison: 'bg-purple-500 hover:bg-purple-600',
  ground: 'bg-yellow-600 hover:bg-yellow-700',
  flying: 'bg-indigo-400 hover:bg-indigo-500',
  psychic: 'bg-pink-500 hover:bg-pink-600',
  bug: 'bg-lime-500 hover:bg-lime-600',
  rock: 'bg-yellow-800 hover:bg-yellow-900',
  ghost: 'bg-purple-700 hover:bg-purple-800',
  dragon: 'bg-indigo-600 hover:bg-indigo-700',
  dark: 'bg-gray-800 hover:bg-gray-900',
  steel: 'bg-gray-500 hover:bg-gray-600',
  fairy: 'bg-pink-300 hover:bg-pink-400',
};

export function PokemonTypeFilter({
  availableTypes,
  selectedTypes,
  onTypeSelect,
}: PokemonTypeFilterProps) {
  const toggleType = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      onTypeSelect(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeSelect([...selectedTypes, type]);
    }
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex flex-wrap gap-2 p-4">
        {availableTypes.map((type) => (
          <Badge
            key={type}
            className={cn(
              'cursor-pointer capitalize text-white transition-all',
              typeColors[type] || 'bg-gray-500',
              selectedTypes.includes(type)
                ? 'ring-2 ring-white ring-offset-2 ring-offset-background'
                : 'opacity-60 hover:opacity-100'
            )}
            onClick={() => toggleType(type)}
          >
            {type}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { Pokemon, PokemonType } from '@/types/pokemon';
import { PokemonCard } from './PokemonCard';
import { PokemonTypeFilter } from './PokemonTypeFilter';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getPokemonList } from '@/lib/pokemon-service';
import { Loader2 } from 'lucide-react';

export function PokedexGrid() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await getPokemonList(151); // Load first generation
        setPokemon(data);
      } catch (error) {
        console.error('Failed to load Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredPokemon = pokemon
    .filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.every((type) => p.types.includes(type));
      return matchesSearch && matchesTypes;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });

  const allTypes = Array.from(
    new Set(pokemon.flatMap((p) => p.types))
  ) as PokemonType[];

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 space-y-4 bg-background p-4 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Search Pokemon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:max-w-xs"
          />
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'id' | 'name')}>
            <SelectTrigger className="sm:max-w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Sort by ID</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PokemonTypeFilter
          availableTypes={allTypes}
          selectedTypes={selectedTypes}
          onTypeSelect={setSelectedTypes}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}
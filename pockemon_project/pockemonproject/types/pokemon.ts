export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface PokemonTypeFilterProps {
  availableTypes: PokemonType[];
  selectedTypes: PokemonType[];
  onTypeSelect: (types: PokemonType[]) => void;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
}
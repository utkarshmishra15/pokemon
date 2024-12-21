import { Pokemon, PokemonType } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  const data = await response.json();
  
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t: any) => t.type.name),
    sprite: data.sprites.other['official-artwork'].front_default,
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
    },
  };
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  
  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const id = pokemon.url.split('/').slice(-2, -1)[0];
      return getPokemon(parseInt(id));
    })
  );
  
  return pokemonList;
}
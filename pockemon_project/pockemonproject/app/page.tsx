import { PokedexGrid } from '@/components/pokemon/PokedexGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">Pokédex</h1>
        <PokedexGrid />
      </div>
    </main>
  );
}
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { ChallengeCard } from '../components/ChallengeCard';
import { Plus } from 'lucide-react';

export function Home() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get('/challenges').then(response => {
      setChallenges(response.data);
    });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">DailyTracker</h1>
          <p className="text-zinc-400 mt-1">Domine seus hábitos, um dia por vez.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          Novo Desafio
        </button>
      </header>

      <div className="flex flex-col gap-4">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} data={challenge} />
        ))}
        
        {challenges.length === 0 && (
          <p className="text-center text-zinc-500 py-10">
            Você ainda não tem desafios. Que tal começar hoje?
          </p>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { api } from '../api/axios';
import { ChallengeCard } from '../components/ChallengeCard';
import { CreateChallengeModal } from '../components/ChallengeModal'; 
import { Plus } from 'lucide-react';

export function Home() {
  const [challenges, setChallenges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  async function fetchChallenges() {
    try {
      const response = await api.get('/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error("Erro ao buscar desafios", error);
    }
  }

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16">
      {/* O Modal vive aqui, mas só aparece se isModalOpen for true */}
      <CreateChallengeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onChallengeCreated={() => {
          fetchChallenges(); 
          
        }}
      />

      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">
            DAILY<span className="text-green-500">TRACKER</span>
          </h1>
          <p className="text-zinc-500 text-lg mt-2">Domine seus hábitos.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-green-900/20"
        >
          <Plus size={20} />
          Novo Desafio
        </button>
      </header>

      <div className="grid gap-4">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} data={challenge} />
        ))}
        
        {challenges.length === 0 && (
          <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-20 text-center hover:border-zinc-700 transition-colors">
            <p className="text-zinc-500">
              Você ainda não tem desafios. <br/>
              Clique no botão acima para começar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
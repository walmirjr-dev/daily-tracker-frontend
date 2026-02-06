import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import { CheckInGrid } from '../components/CheckInGrid';
import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);

  // Mantemos o useCallback para que a função seja estável e reutilizável no botão
  const loadChallenge = useCallback(async () => {
    try {
      const response = await api.get(`/challenges/${id}`);
      setChallenge(response.data);
    } catch (error) {
      console.error("Erro ao carregar desafio:", error);
    }
  }, [id]);

  // CORREÇÃO AQUI:
  useEffect(() => {
    const fetchData = async () => {
      await loadChallenge();
    };
    fetchData();
  }, [loadChallenge]); 

  async function handleCheckIn() {
    try {
      await api.post(`/checkins/challenge/${id}`);
      loadChallenge(); 
    } catch (error) {
      alert("Limite diário atingido ou erro no servidor.");
    }
  }

  if (!challenge) return <div className="p-10 text-zinc-500 text-center">Carregando...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">{challenge.name}</h1>
          <p className="text-zinc-400 mt-2">{challenge.daysRemaining} dias restantes</p>
        </div>
        <div className="text-right">
            <span className="text-2xl font-bold text-green-500">{challenge.progressPercentage}%</span>
            <p className="text-zinc-500 text-sm">{challenge.completedCheckIns} de {challenge.durationDays}</p>
        </div>
      </header>

      <button
        onClick={handleCheckIn}
        disabled={!challenge.canCheckInToday}
        className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-xl transition-all shadow-lg ${
          challenge.canCheckInToday
            ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
            : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
        }`}
      >
        {challenge.canCheckInToday ? (
          <>
            <CheckCircle2 size={26} />
            Check-in de Hoje
          </>
        ) : (
          <>
            <Lock size={26} />
            Concluído por hoje
          </>
        )}
      </button>

      <CheckInGrid 
        totalDays={challenge.durationDays} 
        completedCount={challenge.completedCheckIns} 
      />
    </div>
  );
}
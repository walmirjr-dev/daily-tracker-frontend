import { X, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../api/axios';

export function EditChallengeModal({ isOpen, onClose, onChallengeUpdated, challenge }) {
  const [name, setName] = useState('');
  const [targetDays, setTargetDays] = useState(0);
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && challenge) {
      setName(challenge.name);
      setTargetDays(challenge.targetDays);
      setEndDate(challenge.endDate);
      setError(null);
    }
  }, [isOpen, challenge]);

  useEffect(() => {
    if (!challenge?.initialDate || !endDate) return;

    const start = new Date(challenge.initialDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (end < start) {
      setError("A data final não pode ser anterior à data de início.");
      return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (Number(targetDays) > diffDays) {
      setError(`A meta de ${targetDays} dias não cabe no período de ${diffDays} dias.`);
    } else {
      setError(null);
    }
  }, [challenge?.initialDate, endDate, targetDays]);

  if (!isOpen || !challenge) return null;

  async function handleSubmit(event) {
    event.preventDefault();

    if (error) return;

    try {
      await api.put(`/challenges/${challenge.id}`, {
        name,
        targetDays: Number(targetDays),
        endDate,
        initialDate: challenge.initialDate 
      });

      onChallengeUpdated();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      alert("Erro ao atualizar: " + msg);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-zinc-100">Editar Desafio</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400">Nome</label>
            <input 
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-400">Meta de dias (Check-ins)</label>
              <input 
                required
                type="number"
                min="1"
                value={targetDays}
                onChange={e => setTargetDays(e.target.value)}
                className={`bg-zinc-950 border rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-600'}`}
              />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-500">Início (Imutável)</label>
              <input 
                disabled 
                type="date"
                value={challenge.initialDate}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-500 cursor-not-allowed opacity-70 [color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-400">Data Final</label>
              <input 
                required
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 [color-scheme:dark]"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm animate-pulse">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={!!error}
            className={`mt-4 font-bold py-3 rounded-xl transition-all shadow-lg ${
              error 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
            }`}
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
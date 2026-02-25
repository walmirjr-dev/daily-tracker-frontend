import { X, AlertTriangle, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../api/axios';

export function CreateChallengeModal({ isOpen, onClose, onChallengeCreated }) {
  const [name, setName] = useState('');
  const [initialDate, setInitialDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [endDate, setEndDate] = useState('');
  const [targetDays, setTargetDays] = useState(21);
  const [error, setError] = useState(null);
  const [availableDays, setAvailableDays] = useState(0);

  useEffect(() => {
    if (!initialDate || !endDate) {
      setAvailableDays(0);
      return;
    }

    const start = new Date(initialDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (end < start) {
      setError("A data final não pode ser anterior à data de início.");
      setAvailableDays(0);
      return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setAvailableDays(diffDays);

    if (Number(targetDays) > diffDays) {
      setError(`Sua meta de check-ins (${targetDays}) é maior que o tempo disponível (${diffDays} dias).`);
    } else {
      setError(null);
    }
  }, [initialDate, endDate, targetDays]);

  if (!isOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault();

    if (error) return;

    try {
      await api.post('/challenges', {
        name,
        targetDays: Number(targetDays),
        initialDate,
        endDate
      });

      setName('');
      setTargetDays(21);
      setInitialDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      setError(null);
      setAvailableDays(0);

      onChallengeCreated();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      alert("Erro ao criar: " + msg);
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

        <h2 className="text-2xl font-bold mb-6 text-zinc-100">Novo Hábito</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-400">Qual o nome do desafio?</label>
            <input 
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: Beber 3L de água"
              autoFocus
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="initialDate" className="text-sm font-medium text-zinc-400">Data de Início</label>
              <input 
                required
                id="initialDate"
                type="date"
                value={initialDate}
                onChange={e => setInitialDate(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all [color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-zinc-400">Data Final</label>
              <input 
                required
                id="endDate"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
              <label htmlFor="targetDays" className="text-sm font-medium text-zinc-400">
                Meta de dias (Check-ins)
              </label>
              <input 
                required
                id="targetDays"
                type="number"
                min="1"
                value={targetDays}
                onChange={e => setTargetDays(e.target.value)}
                className={`bg-zinc-950 border rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-green-600'}`}
              />
              
              {!error && availableDays > 0 && (
                <span className="text-xs text-zinc-500 flex items-center gap-1.5 px-1 mt-1">
                  <Calendar size={12} />
                  Você terá <strong className="text-zinc-300">{availableDays} dias totais</strong> para concluir seus check-ins.
                </span>
              )}
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
            className={`mt-2 font-bold py-3 rounded-xl transition-all shadow-lg ${
              error 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none' 
                : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
            }`}
          >
            Começar Desafio
          </button>
        </form>
      </div>
    </div>
  );
}
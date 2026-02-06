import { X } from 'lucide-react';
import { api } from '../api/axios';

export function CreateChallengeModal({ isOpen, onClose, onChallengeCreated }) {
  if (!isOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault(); 

    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const durationDays = formData.get('durationDays');
    const initialDate = formData.get('initialDate');

    try {
      await api.post('/challenges', {
        name,
        durationDays: Number(durationDays), 
        initialDate 
      });

      onChallengeCreated(); 
      onClose(); 
    } catch (error) {
      alert("Erro ao criar: " + error.message);
    }
  }

  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      
      {/* O Card do Modal */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative">
        
        {/* Botão de Fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Novo Hábito</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Campo: Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-400">Qual o nome do desafio?</label>
            <input 
              required
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Beber 3L de água"
              autoFocus
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Grid para Duração e Data */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="durationDays" className="text-sm font-medium text-zinc-400">Duração (dias)</label>
              <input 
                required
                id="durationDays"
                name="durationDays"
                type="number"
                min="1"
                defaultValue={21} 
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="initialDate" className="text-sm font-medium text-zinc-400">Data de Início</label>
              <input 
                required
                id="initialDate"
                name="initialDate"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]} // Hoje
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Botão de Salvar */}
          <button 
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-900/20"
          >
            Começar Desafio
          </button>
        </form>
      </div>
    </div>
  );
}
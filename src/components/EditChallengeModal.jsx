import { X } from 'lucide-react';
import { api } from '../api/axios';

export function EditChallengeModal({ isOpen, onClose, onChallengeUpdated, challenge }) {
  if (!isOpen || !challenge) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await api.put(`/challenges/${challenge.id}`, {
        name: formData.get('name'),
        durationDays: Number(formData.get('durationDays')),
        // Não enviamos mais a initialDate, ou enviamos a original apenas por compatibilidade
        initialDate: challenge.initialDate 
      });

      onChallengeUpdated();
      onClose();
    } catch (error) {
      alert("Erro ao atualizar: " + error.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Editar Desafio</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-400">Nome</label>
            <input 
              required name="name" type="text"
              defaultValue={challenge.name}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-400">Duração (dias)</label>
              <input 
                required name="durationDays" type="number" min="1"
                defaultValue={challenge.durationDays}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            
            {/* CAMPO TRAVADO (IMUTÁVEL) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-500">Início (Imutável)</label>
              <input 
                disabled 
                type="date"
                defaultValue={challenge.initialDate}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-500 cursor-not-allowed opacity-70 [color-scheme:dark]"
              />
            </div>
          </div>

          <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-900/20">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
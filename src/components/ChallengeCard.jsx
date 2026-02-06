import { useState, useRef, useEffect } from 'react';
import { Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { useNavigate } from 'react-router-dom';

export function ChallengeCard({ data, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCardClick() {
    navigate(`/challenge/${data.id}`);
  }

  function toggleMenu(e) {
    e.stopPropagation(); 
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:border-zinc-700 transition-all cursor-pointer group"
    >
      {/* LADO ESQUERDO: TEXTOS */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-green-500 transition-colors">
          {data.name}
        </h3>
        <div className="flex items-center gap-2 text-zinc-500">
          <Calendar size={18} />
          <span className="text-sm font-medium">{data.daysRemaining} dias restantes</span>
        </div>
      </div>

      {/* LADO DIREITO: PROGRESSO + MENU (Agora juntos e organizados) */}
      <div className="flex items-center gap-5"> {/* <--- O GAP AQUI EVITA A COLISÃO */}
        
        <CircularProgress percentage={data.progressPercentage} />

        {/* --- MENU DE 3 PONTINHOS (Agora no fluxo, não mais absolute) --- */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMenu}
            className="p-2 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-all"
          >
            <MoreVertical size={20} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onEdit();
                }}
                className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-blue-400 flex items-center gap-2 transition-colors"
              >
                <Pencil size={16} /> Editar
              </button>
              
              <div className="h-[1px] bg-zinc-900 mx-2" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onDelete();
                }}
                className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-red-900/20 hover:text-red-500 flex items-center gap-2 transition-colors"
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
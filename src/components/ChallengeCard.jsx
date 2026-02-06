import { CalendarDays } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { useNavigate } from 'react-router-dom';

export function ChallengeCard({ data }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/challenge/${data.id}`)}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between hover:border-green-500/50 transition-colors cursor-pointer group"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-green-400 transition-colors">
          {data.name}
        </h3>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <CalendarDays size={16} />
          <span>{data.daysRemaining} dias restantes</span>
        </div>
      </div>

      <CircularProgress percentage={data.progressPercentage} />
    </div>
  );
}
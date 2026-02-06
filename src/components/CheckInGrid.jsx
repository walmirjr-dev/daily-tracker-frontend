import clsx from 'clsx';

export function CheckInGrid({ totalDays, completedCount }) {
  
  const days = Array.from({ length: totalDays });

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-6">
      <h4 className="text-zinc-400 mb-4 font-medium">Progresso Visual</h4>
      
      <div className="grid grid-cols-10 gap-3 sm:gap-2">
        {days.map((_, index) => {
          const isCompleted = index < completedCount; 
          return (
            <div
              key={index}
              title={`Dia ${index + 1}`}
              className={clsx(
                "w-8 h-8 rounded-md transition-all duration-300 border-2",
                isCompleted 
                  ? "bg-green-500 border-green-600 shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
                  : "bg-zinc-950 border-zinc-800"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
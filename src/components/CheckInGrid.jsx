import clsx from 'clsx';

export function CheckInGrid({ totalDays, completedCount, lastCheckInDate }) {
  const days = Array.from({ length: totalDays });

  function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-zinc-400 font-medium">Progresso Visual</h4>
        
        {lastCheckInDate && (
          <span className="text-zinc-400 font-small">
            Último checkIn - {formatDate(lastCheckInDate)}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-2 sm:gap-1.5">
        {days.map((_, index) => {
          const isCompleted = index < completedCount;
          return (
            <div
              key={index}
              title={`Dia ${index + 1}`}
              className={clsx(
                "aspect-square rounded-md transition-all duration-300 border-2",
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
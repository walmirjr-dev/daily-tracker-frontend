export function CircularProgress({ percentage }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {/* Círculo de fundo */}
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="32" cy="32" r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-zinc-700"
        />
        {/* Círculo de progresso */}
        <circle
          cx="32" cy="32" r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-green-500 transition-all duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-bold text-zinc-100">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
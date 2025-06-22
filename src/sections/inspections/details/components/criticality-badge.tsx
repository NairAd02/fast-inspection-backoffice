interface CriticalityBadgeProps {
    value: number;
    className?: string;
  }
  
  export function CriticalityBadge({ value, className = "" }: CriticalityBadgeProps) {
    const getCriticalityColor = (criticality: number) => {
      if (criticality >= 80) return "bg-red-100 text-red-800 border-red-200";
      if (criticality >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
      if (criticality >= 40) return "bg-blue-100 text-blue-800 border-blue-200";
      return "bg-green-100 text-green-800 border-green-200";
    };
  
    const getCriticalityLabel = (criticality: number) => {
      if (criticality >= 80) return "Crítico";
      if (criticality >= 60) return "Alto";
      if (criticality >= 40) return "Moderado";
      return "Bajo";
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCriticalityColor(value)} ${className}`}>
        {getCriticalityLabel(value)} ({value}%)
      </span>
    );
  }
import React from "react";

interface ClusterData {
  pattern: string;
  matchRate: number; // 0–100
  lastObserved?: string; // ISO date or human-readable
  volatilityLevel?: "Low" | "Medium" | "High";
}

interface PatternClusterViewerProps {
  clusters: ClusterData[];
}

const getRiskColor = (rate: number) => {
  if (rate >= 80) return "bg-red-500";
  if (rate >= 50) return "bg-yellow-500";
  return "bg-green-500";
};

const getVolatilityText = (volatility?: string) => {
  switch (volatility) {
    case "High":
      return " High volatility pattern";
    case "Medium":
      return " Moderate volatility";
    case "Low":
      return " Low-risk behavior";
    default:
      return "Unknown pattern dynamics";
  }
};

export const PatternClusterViewer: React.FC<PatternClusterViewerProps> = ({ clusters }) => {
  return (
    <div className="space-y-4">
      {clusters.map((cluster, idx) => (
        <div
          key={idx}
          className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
              {cluster.pattern}
            </span>
            {cluster.lastObserved && (
              <span className="text-xs text-neutral-500">Last seen: {cluster.lastObserved}</span>
            )}
          </div>

          <div className="relative h-2 rounded bg-neutral-300 dark:bg-neutral-700 overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full ${getRiskColor(cluster.matchRate)}`}
              style={{ width: `${cluster.matchRate}%` }}
            />
          </div>

          <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 italic">
            Match rate: {cluster.matchRate.toFixed(1)}% — {getVolatilityText(cluster.volatilityLevel)}
          </div>
        </div>
      ))}
    </div>
  );
};

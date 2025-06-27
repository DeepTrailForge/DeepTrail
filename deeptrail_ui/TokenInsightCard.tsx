import React from "react";

interface TokenInsightCardProps {
  tokenName: string;
  riskScore: number;
  volume: number;
  onClick?: () => void;
}

export const TokenInsightCard: React.FC<TokenInsightCardProps> = ({ tokenName, riskScore, volume, onClick }) => {
  const riskColor = riskScore > 70 ? "bg-red-500" : riskScore > 40 ? "bg-yellow-400" : "bg-green-500";

  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-bold">{tokenName}</h2>
      <p className="text-sm mt-1">Volume: ${volume.toLocaleString()}</p>
      <div className={`w-full h-2 mt-2 rounded ${riskColor}`} />
    </div>
  );
};
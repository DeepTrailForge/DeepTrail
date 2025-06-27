import React from "react";

interface Wallet {
  address: string;
  score: number;
  alerts: number;
}

interface WalletRiskTableProps {
  wallets: Wallet[];
}

export const WalletRiskTable: React.FC<WalletRiskTableProps> = ({ wallets }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Wallet</th>
          <th className="border p-2">Risk Score</th>
          <th className="border p-2">Alerts</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, i) => (
          <tr key={i}>
            <td className="border p-2 font-mono">{wallet.address}</td>
            <td className="border p-2">{wallet.score}</td>
            <td className="border p-2">{wallet.alerts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
import React, { useState, useEffect } from "react";

type FlashloanAlert = {
  txHash: string;
  severity: "medium" | "high" | "critical";
  description: string;
  detectedAt: string;
};

const mockAlerts: FlashloanAlert[] = [
  {
    severity: "medium",
    description: "Sudden increase in borrowing with rapid token swaps",
    detectedAt: "2025-06-27T13:10:00Z",
  },
  {
    severity: "high",
    description: "Multiple flashloan calls in a single transaction bundle",
    detectedAt: "2025-06-27T13:12:30Z",
  },
  {
    severity: "critical",
    description: "Liquidity drain detected with anomalous path routing",
    detectedAt: "2025-06-27T13:15:10Z",
  },
];

const getColor = (severity: FlashloanAlert["severity"]) => {
  switch (severity) {
    case "medium":
      return "bg-yellow-100 border-yellow-500 text-yellow-800";
    case "high":
      return "bg-orange-100 border-orange-500 text-orange-800";
    case "critical":
      return "bg-red-100 border-red-600 text-red-900";
  }
};

export const FlashloanWarningBox = () => {
  const [alerts, setAlerts] = useState<FlashloanAlert[]>([]);

  useEffect(() => {
    // Simulate async alert retrieval
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.txHash}
          className={`border-l-4 p-4 shadow-sm rounded ${getColor(alert.severity)}`}
          role="alert"
        >
          <p className="font-bold">
            🚨 {alert.severity.toUpperCase()} Risk Flashloan Detected
          </p>
          <p className="text-sm mt-1">{alert.description}</p>
          <div className="text-xs mt-2 opacity-80">
            🧾 Tx: <code>{alert.txHash}</code>
          </div>
          <div className="text-xs text-right italic mt-1">
            🕒 {new Date(alert.detectedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

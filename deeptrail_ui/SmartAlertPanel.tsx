import React from "react";

interface Alert {
  id: string;
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
}

interface SmartAlertPanelProps {
  alerts: Alert[];
}

export const SmartAlertPanel: React.FC<SmartAlertPanelProps> = ({ alerts }) => {
  return (
    <div className="grid gap-4">
      {alerts.map(alert => (
        <div key={alert.id} className="border-l-4 p-4 shadow" style={{ borderColor: alert.severity === "high" ? "#DC2626" : alert.severity === "medium" ? "#FBBF24" : "#4ADE80" }}>
          <h4 className="font-semibold">{alert.type}</h4>
          <p className="text-sm">{alert.description}</p>
        </div>
      ))}
    </div>
  );
};
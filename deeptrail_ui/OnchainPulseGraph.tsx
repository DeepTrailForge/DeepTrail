import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { time: '12:00', activity: 320 },
  { time: '12:05', activity: 450 },
  { time: '12:10', activity: 210 },
  { time: '12:15', activity: 390 },
  { time: '12:20', activity: 530 }
];

export const OnchainPulseGraph = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="activity" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
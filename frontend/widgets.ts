interface TrendData {
  name: string;
  trend: number[];
}

function calculateMomentum(data: TrendData): number {
  const delta = data.trend[data.trend.length - 1] - data.trend[0];
  return Math.round((delta / data.trend[0]) * 100);
}

function renderTrend(trend: TrendData): void {
  const momentum = calculateMomentum(trend);
  console.log(`📊 ${trend.name} — Momentum: ${momentum}%`);
}

const trends: TrendData[] = [
  { name: "TokenA", trend: [10, 12, 14, 17, 19] },
  { name: "TokenB", trend: [20, 18, 16, 15, 14] },
];

trends.forEach(renderTrend);
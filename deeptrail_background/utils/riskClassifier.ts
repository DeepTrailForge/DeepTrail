

export enum RiskLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

interface RiskFactors {
  volumeSpikeIndex: number;
  flashloanActivity: boolean;
  smartWalletRatio: number;
  sybilClusterSize: number;
}

export function classifyRisk(factors: RiskFactors): RiskLevel {
  let score = 0;

  if (factors.volumeSpikeIndex > 300) score += 4;
  else if (factors.volumeSpikeIndex > 150) score += 3;
  else if (factors.volumeSpikeIndex > 50) score += 1;

  if (factors.flashloanActivity) score += 5;

  if (factors.smartWalletRatio > 25) score += 3;
  else if (factors.smartWalletRatio > 10) score += 1;

  if (factors.sybilClusterSize >= 8) score += 4;
  else if (factors.sybilClusterSize >= 4) score += 2;

  if (score >= 10) return RiskLevel.Critical;
  if (score >= 6) return RiskLevel.High;
  if (score >= 3) return RiskLevel.Medium;
  return RiskLevel.Low;
}

export function riskDescription(level: RiskLevel): string {
  switch (level) {
    case RiskLevel.Critical:
      return "🚨 Critical risk detected — immediate attention required";
    case RiskLevel.High:
      return "⚠️ High risk — monitor closely";
    case RiskLevel.Medium:
      return "⚠️ Medium risk — caution advised";
    case RiskLevel.Low:
      return "✅ Low risk — normal activity";
  }
}

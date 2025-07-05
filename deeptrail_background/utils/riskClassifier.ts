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

  if (factors.volumeSpikeIndex > 500) score += 5;
  else if (factors.volumeSpikeIndex > 300) score += 4;
  else if (factors.volumeSpikeIndex > 150) score += 2;
  else if (factors.volumeSpikeIndex > 50) score += 1;

  if (factors.flashloanActivity) score += 5;

  if (factors.smartWalletRatio > 40) score += 4;
  else if (factors.smartWalletRatio > 25) score += 2;
  else if (factors.smartWalletRatio > 10) score += 1;

  if (factors.sybilClusterSize >= 10) score += 5;
  else if (factors.sybilClusterSize >= 6) score += 3;
  else if (factors.sybilClusterSize >= 3) score += 1;

  if (score >= 11) return RiskLevel.Critical;
  if (score >= 7) return RiskLevel.High;
  if (score >= 4) return RiskLevel.Medium;
  return RiskLevel.Low;
}

export function riskDescription(level: RiskLevel): string {
  switch (level) {
    case RiskLevel.Critical:
      return "🚨 Critical Threat — severe anomalies detected";
    case RiskLevel.High:
      return "⚠️ High Risk — multiple red flags";
    case RiskLevel.Medium:
      return "🟡 Medium Risk — caution recommended";
    case RiskLevel.Low:
      return "🟢 Low Risk — no major issues found";
  }
}

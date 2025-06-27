
import { getRecentTransactions, getWalletActivity, calculateVolumeIndex } from "./solanaAPI"
import { logAlert } from "./logger"
import { RiskLevel, AnomalyReport } from "./types"

const RISK_THRESHOLDS = {
  volumeSpike: 180,
  flashloanBlocks: 3,
  sybilWalletCount: 8,
  smartWalletRatio: 20
}

export async function scanForAnomalies(tokenAddress: string): Promise<AnomalyReport[]> {
  const recentTxs = await getRecentTransactions(tokenAddress)
  const walletStats = await getWalletActivity(tokenAddress)

  const reports: AnomalyReport[] = []

  // Check for extreme volume spikes
  const vIndex = calculateVolumeIndex(recentTxs)
  if (vIndex > RISK_THRESHOLDS.volumeSpike) {
    reports.push({
      type: "volume_spike",
      token: tokenAddress,
      value: vIndex,
      risk: vIndex > 300 ? RiskLevel.Critical : RiskLevel.High,
      message: `Volume index ${vIndex}% exceeds threshold`
    })
  }

  // Detect smart wallet dominance
  const ratio = (walletStats.smart / walletStats.total) * 100
  if (ratio > RISK_THRESHOLDS.smartWalletRatio) {
    reports.push({
      type: "smart_wallet_dominance",
      token: tokenAddress,
      value: ratio,
      risk: RiskLevel.Medium,
      message: `Smart wallet ratio at ${ratio.toFixed(2)}%`
    })
  }

  // Flag flashloan-like behavior
  const suspectBursts = detectFlashloanPattern(recentTxs)
  if (suspectBursts >= RISK_THRESHOLDS.flashloanBlocks) {
    reports.push({
      type: "flashloan_pattern",
      token: tokenAddress,
      value: suspectBursts,
      risk: RiskLevel.Critical,
      message: `Flashloan pattern in ${suspectBursts} blocks`
    })
  }

  // Sybil detection logic (simplified)
  if (walletStats.sybilClusterSize >= RISK_THRESHOLDS.sybilWalletCount) {
    reports.push({
      type: "sybil_cluster",
      token: tokenAddress,
      value: walletStats.sybilClusterSize,
      risk: RiskLevel.High,
      message: `Detected ${walletStats.sybilClusterSize} linked wallets`
    })
  }

  // Log and return results
  reports.forEach(report => logAlert(report))
  return reports
}

function detectFlashloanPattern(transactions: any[]): number {
  let count = 0
  for (let i = 1; i < transactions.length; i++) {
    const delta = Math.abs(transactions[i].volume - transactions[i - 1].volume)
    if (delta > 100000) count++
  }
  return count
}

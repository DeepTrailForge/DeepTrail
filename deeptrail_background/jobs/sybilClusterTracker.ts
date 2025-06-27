
import { fetchRecentTransfers, groupByWalletFingerprint, sendAlert, logEvent } from "./utils"
import type { Transfer } from "./types"

const TIME_WINDOW_MS = 60_000
const MIN_CLUSTER_SIZE = 4
const VOLUME_SIMILARITY_THRESHOLD = 0.85

interface Cluster {
  fingerprint: string
  members: string[]
  averageVolume: number
  totalTx: number
}

function calculateSimilarity(a: number, b: number): number {
  return 1 - Math.abs(a - b) / Math.max(a, b)
}

async function detectSybilClusters(): Promise<void> {
  const transfers: Transfer[] = await fetchRecentTransfers(TIME_WINDOW_MS)

  const grouped = groupByWalletFingerprint(transfers)
  const clusters: Cluster[] = []

  for (const [fingerprint, wallets] of Object.entries(grouped)) {
    if (wallets.length < MIN_CLUSTER_SIZE) continue

    const totalVolume = wallets.reduce((sum, w) => sum + w.volume, 0)
    const avgVolume = totalVolume / wallets.length

    const similarVolumes = wallets.every(w =>
      calculateSimilarity(w.volume, avgVolume) >= VOLUME_SIMILARITY_THRESHOLD
    )

    if (similarVolumes) {
      clusters.push({
        fingerprint,
        members: wallets.map(w => w.address),
        averageVolume: avgVolume,
        totalTx: wallets.reduce((sum, w) => sum + w.txCount, 0)
      })
    }
  }

  for (const cluster of clusters) {
    const message = `[SybilClusterTracker] Cluster Detected: ${cluster.fingerprint} — ${cluster.members.length} wallets (avg volume: ${cluster.averageVolume.toFixed(2)})`
    logEvent(message)
    sendAlert({
      type: "sybil-cluster",
      importance: "critical",
      content: message,
      data: cluster
    })
  }
}

setInterval(() => {
  detectSybilClusters().catch(console.error)
}, 60_000)

detectSybilClusters()

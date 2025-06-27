

import { initAnomalyScanner } from "./anomalyScanner"
import { monitorFlashloans } from "./monitorFlashloans"
import { watchSmartWallets } from "./smartWalletWatcher"
import { trackSybilClusters } from "./sybilClusterTracker"
import { loadConfig, logStartup } from "./core/utils"
import { schedule } from "./core/scheduler"

async function bootstrap() {
  const config = loadConfig("anomalyLog.json")
  logStartup("Deeptrail Background System Initializing")

  // Set up scheduled background modules
  schedule("📡 Anomaly Scanner", () => initAnomalyScanner(config), 30_000)
  schedule("⚡ Flashloan Monitor", monitorFlashloans, 20_000)
  schedule("👁 Smart Wallet Watcher", watchSmartWallets, 60_000)
  schedule("🕸 Sybil Cluster Tracker", trackSybilClusters, 90_000)

  console.log("✅ Deeptrail background modules launched.")
}

bootstrap().catch((err) => {
  console.error("🔥 Background System Failed to Start", err)
})


import { fetchRecentWallets, logEvent, sendAlert } from "./utils";
import type { WalletActivity } from "./types";

const RATIO_THRESHOLD = 25;
const VOLUME_LIMIT = 10000;
const WATCH_INTERVAL = 30_000; // 30 seconds

let previousSnapshot: WalletActivity[] = [];

function calculateActiveRatio(active: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((active / total) * 100).toFixed(2));
}

function classifySignal(ratio: number): string {
  if (ratio >= RATIO_THRESHOLD) return "📈 Strong Wallet Signal";
  if (ratio >= 10) return "🟡 Moderate Activity";
  return "⚫ Inactive Trend";
}

async function analyzeWalletActivity() {
  const snapshot = await fetchRecentWallets();
  const total = snapshot.length;
  const active = snapshot.filter(w => w.txCount > 1 || w.volume > VOLUME_LIMIT).length;

  const ratio = calculateActiveRatio(active, total);
  const signal = classifySignal(ratio);

  const message = `[SmartWalletWatcher] Active: ${active}/${total} → ${ratio}% — ${signal}`;
  logEvent(message);

  if (ratio >= RATIO_THRESHOLD) {
    sendAlert({
      type: "wallet-signal",
      importance: "high",
      content: message,
      timestamp: new Date().toISOString()
    });
  }

  previousSnapshot = snapshot;
}

// Polling loop
setInterval(() => {
  analyzeWalletActivity().catch(console.error);
}, WATCH_INTERVAL);

analyzeWalletActivity();

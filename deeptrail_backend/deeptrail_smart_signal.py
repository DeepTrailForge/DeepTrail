import datetime
from typing import List, Dict

def smart_wallet_ratio(active: int, total: int) -> float:
    """Calculate the percentage of active smart wallets"""
    if total == 0:
        return 0.0
    return round((active / total) * 100, 2)

def signal_strength(ratio: float) -> str:
    """Classify signal strength based on active smart wallet ratio"""
    if ratio >= 25:
        return "📈 Strong Entry Signal"
    if ratio >= 10:
        return "🟡 Moderate Interest"
    return "⚫ No Signal"

def log_wallet_analysis(active: int, total: int) -> None:
    ratio = smart_wallet_ratio(active, total)
    signal = signal_strength(ratio)
    timestamp = datetime.datetime.now().isoformat()
    print(f"[{timestamp}] Active: {active} / Total: {total} → {ratio}% — {signal}")

    # Optional: log to file (e.g., for dashboard sync)
    with open("wallet_signals.log", "a") as log_file:
        log_file.write(f"{timestamp} | {active}/{total} → {ratio}% — {signal}\n")

def detailed_analysis(wallets: List[Dict[str, int]]) -> None:
    print("\n🔍 Smart Wallet Engagement Analysis")
    print("=" * 40)
    for idx, entry in enumerate(wallets):
        print(f"🔹 Set {idx+1}:")
        log_wallet_analysis(entry["active"], entry["total"])
    print("=" * 40)
    print("✅ Analysis completed\n")

# Test sets
wallet_sets = [
    {"active": 30, "total": 100},
    {"active": 8, "total": 60},
    {"active": 1, "total": 40},
    {"active": 15, "total": 50},   # added example
    {"active": 0, "total": 0},     # edge case
]

# Run analysis
detailed_analysis(wallet_set

import json
import datetime
from typing import List, Dict

FLASH_THRESHOLD = 2.5  # multiplier of volume spike
BLOCK_WINDOW = 5       # number of recent blocks to analyze
GAS_ALERT_LEVEL = 200000

def load_recent_blocks(file_path: str) -> List[Dict]:
    with open(file_path, "r") as f:
        return json.load(f)

def detect_flashloan_pattern(blocks: List[Dict]) -> List[Dict]:
    alerts = []
    for i in range(1, len(blocks)):
        prev = blocks[i - 1]
        curr = blocks[i]
        volume_ratio = curr["volume"] / max(prev["volume"], 1)
        gas_used = curr.get("avg_gas", 0)

        if volume_ratio >= FLASH_THRESHOLD and gas_used > GAS_ALERT_LEVEL:
            alerts.append({
                "block": curr["block"],
                "timestamp": curr["timestamp"],
                "volume": curr["volume"],
                "gas": gas_used,
                "alert": "🚨 Flashloan suspected",
                "details": f"Volume x{round(volume_ratio,2)}, Gas {gas_used}"
            })
    return alerts

def log_alerts(alerts: List[Dict], out_path: str):
    with open(out_path, "a") as f:
        for alert in alerts:
            f.write(json.dumps(alert) + "\n")

def main():
    blocks = load_recent_blocks("recentBlocks.json")
    flash_alerts = detect_flashloan_pattern(blocks[-BLOCK_WINDOW:])
    
    if flash_alerts:
        print(f"[{datetime.datetime.now().isoformat()}] Flashloan activity detected")
        log_alerts(flash_alerts, "flashloanAlerts.json")
    else:
        print(f"[{datetime.datetime.now().isoformat()}] No flashloan activity found")

if __name__ == "__main__":
    main()

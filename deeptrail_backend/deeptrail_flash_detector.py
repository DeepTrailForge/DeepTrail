from typing import List
import matplotlib.pyplot as plt
import datetime

def detect_flash_activity(volumes: List[int]) -> int:
    spike_count = 0
    for i in range(1, len(volumes)):
        if volumes[i] > volumes[i-1] * 2:
            spike_count += 1
    return spike_count

def detect_dumps(volumes: List[int]) -> int:
    dump_count = 0
    for i in range(1, len(volumes)):
        if volumes[i] < volumes[i-1] * 0.5:
            dump_count += 1
    return dump_count

def label_flash_risk(spikes: int, dumps: int) -> str:
    if spikes >= 3 or dumps >= 3:
        return "🚨 Flash Pump/Dump Risk"
    if spikes == 2 or dumps == 2:
        return "⚠️ Monitor Closely"
    return "🟢 Stable"

def log_series_analysis(volumes: List[int]):
    timestamp = datetime.datetime.now().isoformat()
    print(f"\n[{timestamp}] Analyzing volume series: {volumes}")
    spikes = detect_flash_activity(volumes)
    dumps = detect_dumps(volumes)
    label = label_flash_risk(spikes, dumps)
    print(f"📈 Spikes: {spikes} | 📉 Dumps: {dumps} → {label}")
    return label

def plot_series(volumes: List[int], label: str):
    plt.figure(figsize=(6, 3))
    plt.plot(volumes, marker='o', linestyle='-', color='darkblue')
    plt.title(f"Volume Series — {label}")
    plt.xlabel("Time Point")
    plt.ylabel("Volume")
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Sample sets
volume_sets = [
    [1000, 2500, 8000, 8500],
    [500, 1100, 2000, 2100],
    [700, 900, 950, 1000],
    [4000, 1000, 4200, 1500],  # dump & pump combo
]

for s in volume_sets:
    risk_label = log_series_analysis(s)
    # plot_series(s, risk_label)  # Uncomment if you want visual output

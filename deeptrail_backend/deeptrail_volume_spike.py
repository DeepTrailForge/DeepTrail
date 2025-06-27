import datetime
from typing import List, Dict

def volume_spike_index(current_volume: int, avg_volume: int) -> float:
    """Calculate volume spike index as a percentage"""
    if avg_volume == 0:
        return 0.0
    return round((current_volume / avg_volume) * 100, 1)

def classify_spike(index: float) -> str:
    """Classify the severity of a volume spike"""
    if index > 300:
        return "🚨 Extreme Spike"
    if index > 150:
        return "⚠️ Notable Spike"
    return "🟢 Normal"

def format_volume(v: int) -> str:
    """Human-readable volume format"""
    if v >= 1_000_000:
        return f"{v / 1_000_000:.1f}M"
    elif v >= 1_000:
        return f"{v / 1_000:.1f}K"
    return str(v)

def log_spike_analysis(current: int, average: int) -> None:
    """Logs and prints spike analysis with formatting"""
    index = volume_spike_index(current, average)
    category = classify_spike(index)
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    print(f"[{timestamp}] Volume: {format_volume(current)} / Avg: {format_volume(average)}")
    print(f"→ Spike Index: {index}% — {category}")
    print("-" * 50)

    # Optional: write to log
    with open("volume_spikes.log", "a") as log:
        log.write(f"{timestamp} | {current}/{average} = {index}% — {category}\n")

def analyze_volume_samples(samples: List[Dict[str, int]]) -> None:
    """Sort and analyze multiple volume samples"""
    print("📊 Deeptrail Volume Spike Analyzer\n" + "=" * 50)
    samples_sorted = sorted(samples, key=lambda x: volume_spike_index(x["current"], x["average"]), reverse=True)
    for s in samples_sorted:
        log_spike_analysis(s["current"], s["average"])
    print("✅ Analysis complete.\n")

# Test samples
volume_data = [
    {"current": 180000, "average": 40000},
    {"current": 90000, "average": 60000},
    {"current": 30000, "average": 45000},
    {"current": 500000, "average": 80000},   # High spike
    {"current": 0, "average": 10000},        # No volume
    {"current": 40000, "average": 0},        # Edge: avg = 0
]

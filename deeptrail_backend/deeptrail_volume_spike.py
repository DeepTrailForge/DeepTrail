def volume_spike_index(current_volume, avg_volume):
    if avg_volume == 0:
        return 0
    return round((current_volume / avg_volume) * 100, 1)

def classify_spike(index):
    if index > 300:
        return "🚨 Extreme Spike"
    if index > 150:
        return "⚠️ Notable Spike"
    return "🟢 Normal"

samples = [
    {"current": 180000, "average": 40000},
    {"current": 90000, "average": 60000},
    {"current": 30000, "average": 45000},
]

for s in samples:
    idx = volume_spike_index(s["current"], s["average"])
    print(f"Volume: {s['current']} / Avg: {s['average']} → Index: {idx}% — {classify_spike(idx)}")
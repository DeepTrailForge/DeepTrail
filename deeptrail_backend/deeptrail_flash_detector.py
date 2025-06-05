def detect_flash_activity(volumes):
    spike_count = 0
    for i in range(1, len(volumes)):
        if volumes[i] > volumes[i-1] * 2:
            spike_count += 1
    return spike_count

def label_flash_risk(spikes):
    if spikes >= 3:
        return "🚨 Flash Pump Risk"
    if spikes == 2:
        return "⚠️ Monitor Closely"
    return "🟢 Stable"

sets = [
    [1000, 2500, 8000, 8500],
    [500, 1100, 2000, 2100],
    [700, 900, 950, 1000]
]

for s in sets:
    spikes = detect_flash_activity(s)
    print(f"Series: {s} → {label_flash_risk(spikes)}")
def calculate_trend_strength(volume_history):
    if not volume_history:
        return 0
    avg_volume = sum(volume_history) / len(volume_history)
    recent_volume = volume_history[-1]
    return round((recent_volume / avg_volume) * 100, 2)

def detect_anomaly(volatility_series):
    spikes = 0
    for i in range(1, len(volatility_series)):
        if abs(volatility_series[i] - volatility_series[i - 1]) > 20:
            spikes += 1
    return "High Volatility" if spikes >= 3 else "Stable"

def entry_signal_generator(score, heat_index):
    if score > 80 and heat_index > 70:
        return "Entry Recommended"
    elif score > 50:
        return "Watch Closely"
    return "Avoid Entry"
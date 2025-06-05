def smart_wallet_ratio(active, total):
    if total == 0:
        return 0
    return round((active / total) * 100, 2)

def signal_strength(ratio):
    if ratio >= 25:
        return "📈 Strong Entry Signal"
    if ratio >= 10:
        return "🟡 Moderate Interest"
    return "⚫ No Signal"

wallet_sets = [
    {"active": 30, "total": 100},
    {"active": 8, "total": 60},
    {"active": 1, "total": 40}
]

for w in wallet_sets:
    ratio = smart_wallet_ratio(w["active"], w["total"])
    print(f"{w['active']}/{w['total']} wallets → {ratio}% — {signal_strength(ratio)}")
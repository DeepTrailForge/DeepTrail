import datetime

def log_event(message: str):
    now = datetime.datetime.now().isoformat()
    with open("logs.txt", "a") as f:
        f.write(f"[{now}] {message}\n")

log_event("Deeptrail background system initialized.")
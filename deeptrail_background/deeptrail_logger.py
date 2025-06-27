import datetime
import os
import sys

LOG_FILE_PATH = "logs/deeptrail_events.log"
MAX_LOG_SIZE_MB = 5  # Авто-архивация не реализована, просто ограничитель

def ensure_log_directory():
    os.makedirs(os.path.dirname(LOG_FILE_PATH), exist_ok=True)

def get_log_level_color(level: str) -> str:
    colors = {
        "INFO": "\033[92m",    # зелёный
        "WARN": "\033[93m",    # жёлтый
        "ERROR": "\033[91m",   # красный
        "RESET": "\033[0m"
    }
    return colors.get(level.upper(), "\033[0m")

def log_event(message: str, level: str = "INFO"):
    ensure_log_directory()
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    level = level.upper()
    log_line = f"[{timestamp}] [{level}] {message}\n"

    try:
        if os.path.exists(LOG_FILE_PATH) and os.path.getsize(LOG_FILE_PATH) > MAX_LOG_SIZE_MB * 1024 * 1024:
            log_line = f"[{timestamp}] [WARN] Log file exceeded {MAX_LOG_SIZE_MB}MB. Skipping log write.\n"
            print(get_log_level_color("WARN") + log_line.strip() + get_log_level_color("RESET"))
            return

        with open(LOG_FILE_PATH, "a", encoding="utf-8") as log_file:
            log_file.write(log_line)
    except Exception as e:
        print(get_log_level_color("ERROR") + f"[{timestamp}] [ERROR] Failed to write log: {e}" + get_log_level_color("RESET"))
        print(get_log_level_color(level) + log_line.strip() + get_log_level_color("RESET"))

# Примеры:
log_event("Deeptrail background system initialized.")
log_event("Anomaly pattern detected in TX cluster.", "warn")
log_event("Critical failure: unable to sync state cache.", "error")

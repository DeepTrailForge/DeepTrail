#!/bin/bash
echo "🚀 Deeptrail backend running..."
python3 deeptrail_backend/deeptrail_volume_spike.py
python3 deeptrail_backend/deeptrail_smart_signal.py
python3 deeptrail_backend/deeptrail_flash_detector.py
#!/bin/bash

echo "🚀 Starting Deeptrail Analysis Engine..."
python3 ../backend/main.py

echo ""
echo "💡 Launching Frontend Wallet Dashboard..."
ts-node ../frontend/ui.ts
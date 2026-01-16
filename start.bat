@echo off
echo ========================================
echo   AI Financial Intelligence Platform
echo   Starting All Services...
echo ========================================
echo.
echo This will start:
echo   - Kafka + Zookeeper (Message Broker)
echo   - MinIO (Data Lake)
echo   - Python Backend (AI Analysis)
echo   - FastAPI (REST API)
echo   - React Frontend (Main UI)
echo   - Streamlit Dashboard (Alternative UI)
echo.
echo Please wait 3-5 minutes for initialization...
echo.

docker-compose up --build

pause

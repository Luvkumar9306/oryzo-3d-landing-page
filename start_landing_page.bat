@echo off
echo ===================================================
echo   Starting Oryzo 3D Landing Page Development Server
echo ===================================================
echo.
cd /d "%~dp0"
start "" "http://127.0.0.1:5173"
call npx vite --host 127.0.0.1 --port 5173
pause

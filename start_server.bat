@echo off
echo Starting Castle Game Server...

REM Change to the directory where the BAT file is located
cd /d "%~dp0"

REM Check if node_modules exists in the root
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install express
)

REM Check if server.js exists
if not exist "src\server.js" (
    echo Error: Could not find src\server.js
    echo Current directory: %CD%
    pause
    exit /b 1
)

REM Check if port 3000 is already in use
echo Checking if port 3000 is available...
netstat -an | findstr ":3000" >nul
if %errorlevel% equ 0 (
    echo Warning: Port 3000 is already in use!
    echo Attempting to kill existing process on port 3000...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
)

echo Starting server on http://localhost:3000...
node src/server.js
pause 
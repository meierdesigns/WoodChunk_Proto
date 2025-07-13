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

echo Starting server...
node src/server.js
pause 
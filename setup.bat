@echo off
echo NITP Tribe Connect - Setup Script
echo ================================

echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js found!
    node --version
    echo.
    echo Installing dependencies...
    npm install
    if %errorlevel% equ 0 (
        echo.
        echo Dependencies installed successfully!
        echo.
        echo Starting development server...
        npm run dev
    ) else (
        echo Failed to install dependencies
    )
) else (
    echo Node.js not found!
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Then run this script again.
    echo.
    echo Alternatively, install Bun from https://bun.sh/
    echo and run: bun install && bun run dev
)

pause

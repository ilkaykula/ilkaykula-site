# Quick Fix Script for Node.js Version Issue

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Node.js Version Fix for Next.js 12" -ForegroundColor Cyan  
Write-Host "================================`n" -ForegroundColor Cyan

# Check current Node version
Write-Host "Current Node.js version:" -ForegroundColor Yellow
node --version

Write-Host "`nNext.js 12 requires Node.js v16-v18" -ForegroundColor Red
Write-Host "You are running Node.js v25, which is incompatible.`n" -ForegroundColor Red

# Check if nvm is available
$nvmInstalled = Get-Command nvm -ErrorAction SilentlyContinue

if ($nvmInstalled) {
    Write-Host "✓ NVM is installed`n" -ForegroundColor Green
    
    Write-Host "Installing Node.js v18.20.5..." -ForegroundColor Yellow
    nvm install 18.20.5
    
    Write-Host "`nSwitching to Node.js v18..." -ForegroundColor Yellow
    nvm use 18
    
    Write-Host "`nNew Node.js version:" -ForegroundColor Green
    node --version
    
    Write-Host "`nCleaning old dependencies..." -ForegroundColor Yellow
    if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
    if (Test-Path ".next") { Remove-Item -Recurse -Force .next }
    if (Test-Path "out") { Remove-Item -Recurse -Force out }
    if (Test-Path "package-lock.json") { Remove-Item -Force package-lock.json }
    
    Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    
    Write-Host "`n================================" -ForegroundColor Green
    Write-Host "✓ Setup complete!" -ForegroundColor Green
    Write-Host "================================`n" -ForegroundColor Green
    
    Write-Host "You can now run:" -ForegroundColor Cyan
    Write-Host "  npm run dev    # Start development server" -ForegroundColor White
    Write-Host "  npm run build  # Build for production`n" -ForegroundColor White
    
} else {
    Write-Host "✗ NVM is not installed`n" -ForegroundColor Red
    Write-Host "Please install Node.js v18 manually:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://nodejs.org/en/download/" -ForegroundColor White
    Write-Host "2. Select version 18.x LTS" -ForegroundColor White
    Write-Host "3. Install and restart terminal" -ForegroundColor White
    Write-Host "4. Run this script again`n" -ForegroundColor White
}

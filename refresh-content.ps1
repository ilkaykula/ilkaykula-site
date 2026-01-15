# Refresh Content After Studio Changes
# Run this after publishing changes in Sanity Studio

Write-Host "`n🔄 Refreshing content from Sanity..." -ForegroundColor Cyan

# Stop the dev server
Write-Host "Stopping dev server..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {$_.CommandLine -like '*next dev*'} | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear Next.js cache
Write-Host "Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}

# Restart dev server
Write-Host "Starting dev server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "`n✅ Done! Wait for compilation, then refresh your browser." -ForegroundColor Green
Write-Host "Your site: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Studio: http://localhost:3000/studio`n" -ForegroundColor Cyan

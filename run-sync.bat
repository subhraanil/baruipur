@echo off
title Baruipur Online - Daily News Sync
cd /d "%~dp0"

echo =======================================================
echo   Baruipur Online - Daily News Sync & Deployment
echo =======================================================
echo.
echo Starting crawl for today's news from 10 regional sources...
echo.

node scripts/sync-news.js --days=1

echo.
echo =======================================================
echo   Sync complete! Check https://baruipur.online/
echo =======================================================
pause

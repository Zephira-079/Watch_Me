@echo off
set processName=php.exe
set websiteURL=http://localhost:8000

start /B php -S localhost:8000 && start /B cmd /c start "" %websiteURL%

:CHECK_LOOP
tasklist | find /i "%processName%" > nul

if errorlevel 1 (
    echo %processName% is not running. Starting it now...
    start /B php -S localhost:8000 && start /B cmd /c start "" %websiteURL%
) else (
    echo %processName% is already running.
)

timeout /nobreak /t 10 > nul
goto CHECK_LOOP

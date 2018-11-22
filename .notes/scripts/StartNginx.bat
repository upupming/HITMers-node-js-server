@ECHO OFF

REM Start Nginx
tasklist /FI "IMAGENAME eq nginx.exe" 2>NUL | find /I /N "nginx.exe">NUL
IF NOT "%ERRORLEVEL%"=="0" (
   REM Nginx is NOT running, so start it
   e:
   cd \software\nginx-1.14.0
   start nginx.exe
   ECHO Nginx started.
) else (
   ECHO Nginx is already running.
)

REM Start php-cgi
tasklist /FI "IMAGENAME eq php-cgi.exe" 2>NUL | find /I /N "php-cgi.exe">NUL
IF NOT "%ERRORLEVEL%"=="0" (
   REM php-cgi is NOT running, so start it
   start /min e:\software\php-7.2.9-Win32-VC15-x64\php-cgi.exe -b localhost:9000 -c e:\software\php-7.2.9-Win32-VC15-x64\php.ini
   ECHO php-cgi started.
) else (
   ECHO php-cgi is already running.
)
@echo off

rem Eliminar las carpetas android y www si existen
if exist android (
    rmdir /s /q android
)
if exist www (
    rmdir /s /q www
)

rem Ejecutar los comandos de Ionic
call ionic build --prod
call ionic cap add android --prod
call ionic capacitor sync android --prod
call ionic capacitor copy android --prod
call npx capacitor-assets generate --android 
call ionic capacitor build android --prod


pause

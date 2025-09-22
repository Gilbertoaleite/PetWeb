@echo off
echo 🔍 DIAGNÓSTICO DE CONECTIVIDADE API
echo ==================================

REM Verificar variáveis de ambiente
echo 📋 Verificando configuração...
if exist .env.local (
    echo ✅ Arquivo .env.local encontrado:
    findstr BASE_API .env.local
) else (
    echo ❌ Arquivo .env.local não encontrado!
)

echo.
echo 🌐 Testando conectividade...

REM Testar APIs (usando PowerShell dentro do batch)
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://adote-pet-web.herokuapp.com/api/' -TimeoutSec 5 -UseBasicParsing; Write-Host '✅ https://adote-pet-web.herokuapp.com/api/ - OK' } catch { Write-Host '❌ https://adote-pet-web.herokuapp.com/api/ - FALHA' }"

powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://adote-um-pet-multistack.herokuapp.com/api' -TimeoutSec 5 -UseBasicParsing; Write-Host '✅ https://adote-um-pet-multistack.herokuapp.com/api - OK' } catch { Write-Host '❌ https://adote-um-pet-multistack.herokuapp.com/api - FALHA' }"

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api' -TimeoutSec 2 -UseBasicParsing; Write-Host '✅ http://localhost:8080/api - OK (Backend local rodando)' } catch { Write-Host '❌ http://localhost:8080/api - FALHA (Backend local não está rodando)' }"

powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001' -TimeoutSec 2 -UseBasicParsing; Write-Host '✅ http://localhost:3001 - OK (Servidor mock rodando)' } catch { Write-Host '❌ http://localhost:3001 - FALHA (Servidor mock não está rodando)' }"

echo.
echo 🛠️  RECOMENDAÇÕES:
echo 1. Se todas as APIs externas falharam, use: npm run mock
echo 2. Configure .env.local com BASE_API=http://localhost:3001  
echo 3. Para backend Java local, use BASE_API=http://localhost:8080/api
echo 4. Reinicie o servidor Next.js após alterar .env.local

pause
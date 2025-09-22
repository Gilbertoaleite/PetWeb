#!/bin/bash

echo "🔍 DIAGNÓSTICO DE CONECTIVIDADE API"
echo "=================================="

# Verificar variáveis de ambiente
echo "📋 Verificando configuração..."
if [ -f .env.local ]; then
    echo "✅ Arquivo .env.local encontrado:"
    grep BASE_API .env.local
else
    echo "❌ Arquivo .env.local não encontrado!"
fi

# Testar conectividade com as APIs
echo ""
echo "🌐 Testando conectividade..."

# API Heroku 1
echo "Testando: https://adote-pet-web.herokuapp.com/api/"
curl -s --connect-timeout 5 https://adote-pet-web.herokuapp.com/api/ > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ https://adote-pet-web.herokuapp.com/api/ - OK"
else
    echo "❌ https://adote-pet-web.herokuapp.com/api/ - FALHA"
fi

# API Heroku 2  
echo "Testando: https://adote-um-pet-multistack.herokuapp.com/api"
curl -s --connect-timeout 5 https://adote-um-pet-multistack.herokuapp.com/api > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ https://adote-um-pet-multistack.herokuapp.com/api - OK"
else
    echo "❌ https://adote-um-pet-multistack.herokuapp.com/api - FALHA"
fi

# Localhost
echo "Testando: http://localhost:8080/api"
curl -s --connect-timeout 2 http://localhost:8080/api > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ http://localhost:8080/api - OK (Backend local rodando)"
else
    echo "❌ http://localhost:8080/api - FALHA (Backend local não está rodando)"
fi

# Mock server
echo "Testando: http://localhost:3001"
curl -s --connect-timeout 2 http://localhost:3001 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ http://localhost:3001 - OK (Servidor mock rodando)"
else
    echo "❌ http://localhost:3001 - FALHA (Servidor mock não está rodando)"
fi

echo ""
echo "🛠️  RECOMENDAÇÕES:"
echo "1. Se todas as APIs externas falharam, use: npm run mock"
echo "2. Configure .env.local com BASE_API=http://localhost:3001"
echo "3. Para backend Java local, use BASE_API=http://localhost:8080/api"
echo "4. Reinicie o servidor Next.js após alterar .env.local"
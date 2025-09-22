#!/bin/bash

echo "🚀 Deploy do Mock API"
echo "====================="

# Verificar se yarn está disponível
if command -v yarn &> /dev/null; then
    YARN_AVAILABLE=true
    echo "📦 Yarn detectado!"
else
    YARN_AVAILABLE=false
    echo "📦 Usando NPM..."
fi

# Verificar se vercel está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não encontrado. Instalando..."
    
    if [ "$YARN_AVAILABLE" = true ]; then
        yarn global add vercel
    else
        npm install -g vercel
    fi
fi

# Fazer o deploy
echo "📦 Fazendo deploy para Vercel..."

if [ "$YARN_AVAILABLE" = true ]; then
    echo "🔄 Usando Yarn para deploy..."
    yarn mock:deploy
else
    echo "🔄 Usando comando direto..."
    vercel --prod
fi

echo ""
echo "✅ Deploy concluído!"
echo "🔧 Lembre-se de atualizar o arquivo .env.local com a URL gerada:"
echo "   NEXT_PUBLIC_BASE_API=https://sua-url.vercel.app/api"
echo ""
echo "🧪 Para testar a API, acesse:"
echo "   https://sua-url.vercel.app/api/pets"
echo "   https://sua-url.vercel.app/api/adocoes"
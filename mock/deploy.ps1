# Deploy do Mock API
Write-Host "🚀 Deploy do Mock API" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

# Verificar se yarn está disponível
$yarnExists = Get-Command yarn -ErrorAction SilentlyContinue

# Verificar se vercel está instalado
$vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelExists) {
    Write-Host "❌ Vercel CLI não encontrado. Instalando..." -ForegroundColor Red
    
    if ($yarnExists) {
        Write-Host "📦 Usando Yarn..." -ForegroundColor Yellow
        yarn global add vercel
    } else {
        Write-Host "📦 Usando NPM..." -ForegroundColor Yellow
        npm install -g vercel
    }
}

# Fazer o deploy
Write-Host "📦 Fazendo deploy para Vercel..." -ForegroundColor Yellow

# Escolher método de deploy
if ($yarnExists) {
    Write-Host "🔄 Usando Yarn para deploy..." -ForegroundColor Green
    yarn mock:deploy
} else {
    Write-Host "🔄 Usando comando direto..." -ForegroundColor Green
    vercel --prod
}

Write-Host ""
Write-Host "✅ Deploy concluído!" -ForegroundColor Green
Write-Host "🔧 Lembre-se de atualizar o arquivo .env.local com a URL gerada:" -ForegroundColor Yellow
Write-Host "   NEXT_PUBLIC_BASE_API=https://sua-url.vercel.app/api" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Para testar a API, acesse:" -ForegroundColor Cyan
Write-Host "   https://sua-url.vercel.app/api/pets" -ForegroundColor White
Write-Host "   https://sua-url.vercel.app/api/adocoes" -ForegroundColor White

Read-Host "Pressione Enter para continuar..."
# Servidor de Desenvolvimento Mock

Este diretório contém um servidor mock para desenvolvimento quando o backend não estiver disponível.

## 🚀 Como usar

### 1. Instalar json-server globalmente
```bash
npm install -g json-server
```

### 2. Iniciar o servidor mock
```bash
# Na pasta mock/
json-server --watch db.json --port 3001
```

### 3. Configurar variável de ambiente
No arquivo `.env.local`, altere para:
```
BASE_API=http://localhost:3001
```

## 📋 Endpoints disponíveis

- **GET** `/pets` - Lista todos os pets
- **POST** `/pets` - Cadastra novo pet
- **GET** `/adocoes` - Lista relatório de adoções
- **POST** `/adocoes` - Registra nova adoção

## 🔄 Estrutura de dados

### Pet
```json
{
  "id": 1,
  "nome": "Nome do Pet",
  "historia": "História do pet...",
  "foto": "URL da foto"
}
```

### Adoção
```json
{
  "id": 1,
  "email": "adotante@email.com",
  "valor": "150.00",
  "pet": {
    "id": 1,
    "nome": "Nome do Pet",
    "historia": "História...",
    "foto": "URL"
  }
}
```

## ⚡ Script para package.json

Adicione no `package.json`:
```json
{
  "scripts": {
    "mock": "json-server --watch mock/db.json --port 3002",
    "mock:deploy": "vercel --prod",
    "mock:dev": "vercel dev", 
    "mock:preview": "vercel"
  }
}
```

**Execute com NPM:**
```bash
npm run mock
```

**Execute com Yarn:**
```bash
yarn mock
```

## 🧶 Para usuários Yarn

Veja o guia completo em [YARN_DEPLOY.md](../YARN_DEPLOY.md) ou o guia geral em [DEPLOY_MOCK.md](../DEPLOY_MOCK.md)

## ☁️ Mock em Nuvem

Para deploy do mock em produção/teste, você pode usar essas opções:

### Opção 1: JSON Server Vercel (Recomendado)

1. Instale o `json-server-vercel`:
```bash
npm install json-server-vercel
```

2. Crie `api/server.js`:
```javascript
// api/server.js
const jsonServer = require('json-server-vercel')
const server = jsonServer.create()
const router = jsonServer.router('mock/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

module.exports = server
```

3. Crie `vercel.json`:
```json
{
  "functions": {
    "api/server.js": {
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/server.js"
    }
  ]
}
```

4. Deploy:
```bash
npx vercel --prod
```

### Opção 2: My JSON Server (GitHub)

1. Faça commit do `db.json` no GitHub
2. Use: `https://my-json-server.typicode.com/{usuario}/{repositorio}`

Exemplo: `https://my-json-server.typicode.com/Gilbertoaleite/PetWeb`

### Opção 3: JSON Bin (Simples)

1. Acesse https://jsonbin.io/
2. Cole o conteúdo do `db.json`
3. Use a URL gerada

### Opção 4: Railway Deploy

1. Crie `package.json` na pasta mock:
```json
{
  "name": "pet-mock-api",
  "version": "1.0.0",
  "scripts": {
    "start": "json-server --watch db.json --port $PORT --host 0.0.0.0"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}
```

2. Deploy no Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login e deploy
railway login
railway deploy
```

### 🔧 Configuração no Frontend

Após escolher uma opção, atualize `.env.local`:
```bash
# Para Vercel
NEXT_PUBLIC_BASE_API=https://seu-app.vercel.app/api

# Para My JSON Server  
NEXT_PUBLIC_BASE_API=https://my-json-server.typicode.com/Gilbertoaleite/PetWeb

# Para Railway
NEXT_PUBLIC_BASE_API=https://seu-app.railway.app
```

### 📝 Script Automatizado

Adicione no `package.json`:
```json
{
  "scripts": {
    "mock": "json-server --watch mock/db.json --port 3002",
    "mock:deploy": "vercel --prod",
    "mock:dev": "vercel dev"
  }
}
```
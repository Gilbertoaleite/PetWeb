# 🐾 Pet Adoption System - Sistema de Adoção de Pets

Sistema completo de adoção de pets virtuais desenvolvido com Next.js, TypeScript, Material-UI e API em nuvem.

![Status](https://img.shields.io/badge/Status-Funcionando-brightgreen)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)
![API](https://img.shields.io/badge/API-Serverless-blue)

## 📋 Índice

- [🚀 Demo](#-demo)
- [🛠️ Tecnologias](#️-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Instalação](#-instalação)
- [📊 Banco de Dados](#-banco-de-dados)
- [🌐 Deploy](#-deploy)
- [📖 Funcionalidades](#-funcionalidades)
- [🔗 Scripts Disponíveis](#-scripts-disponíveis)
- [📚 Documentação Técnica](#-documentação-técnica)

## 🚀 Demo

**Aplicação em Produção:** https://pets-frontend-lwyojegcu-ediaristas.vercel.app

**API Endpoints:**
- `GET /api/pets` - Lista todos os pets
- `GET /api/adocoes` - Lista todas as adoções
- `POST /api/adocoes` - Cria nova adoção

## 🛠️ Tecnologias

### Frontend
- **Next.js 12.1.6** - Framework React
- **React 18.1.0** - Biblioteca JavaScript
- **TypeScript 4.7.2** - Tipagem estática
- **Material-UI 5.8.2** - Componentes de interface
- **Styled Components** - Estilização
- **Axios** - Cliente HTTP

### Backend/API
- **Next.js API Routes** - Endpoints serverless
- **Vercel Functions** - Hospedagem serverless
- **JSON Database** - Dados mock em produção

### DevOps
- **Vercel** - Deploy e hospedagem
- **Yarn/NPM** - Gerenciamento de pacotes
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
frontend/
├── 📁 src/
│   ├── 📁 data/
│   │   ├── 📁 @types/          # Interfaces TypeScript
│   │   ├── 📁 hooks/           # Custom hooks React
│   │   └── 📁 services/        # Serviços da API
│   └── 📁 ui/
│       ├── 📁 components/      # Componentes React
│       ├── 📁 styles/          # Estilos globais
│       └── 📁 themes/          # Temas Material-UI
├── 📁 pages/
│   ├── 📁 api/                 # API Routes do Next.js
│   ├── 📁 pets/               # Páginas dos pets
│   ├── _app.tsx               # App principal
│   └── index.tsx              # Página inicial
├── 📁 public/                 # Arquivos estáticos
├── 📁 mock/                   # Dados mock
├── 📁 database/               # Scripts SQL
└── 📁 scripts/                # Scripts de automação
```

## 🔧 Instalação

### 1. Pré-requisitos
```bash
Node.js 16+ 
Yarn ou NPM
```

### 2. Clone o repositório
```bash
git clone https://github.com/Gilbertoaleite/PetWeb.git
cd PetWeb/frontend
```

### 3. Instale as dependências
```bash
# Com Yarn (recomendado)
yarn install

# Ou com NPM
npm install
```

### 4. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local
NEXT_PUBLIC_BASE_API=http://localhost:3002
```

### 5. Execute o projeto

**Modo Desenvolvimento:**
```bash
# Frontend
yarn dev          # http://localhost:3000

# API Mock Local
yarn mock         # http://localhost:3002
```

**Modo Produção:**
```bash
yarn build
yarn start
```

## 📊 Banco de Dados

### Schema MySQL

O sistema usa um banco MySQL com as seguintes tabelas:

#### Tabela `pets`
```sql
CREATE TABLE pets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL CHECK (CHAR_LENGTH(nome) >= 3),
    historia TEXT NOT NULL CHECK (CHAR_LENGTH(historia) >= 20),
    foto VARCHAR(500) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabela `adocoes`
```sql
CREATE TABLE adocoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL CHECK (valor > 0),
    data_adocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'aprovado', 'cancelado') DEFAULT 'pendente',
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
```

### Configuração do Banco

1. **Execute o schema completo:**
```bash
mysql -u root -p < database/schema.sql
```

2. **Ou use a migração:**
```bash
mysql -u root -p < database/migration.sql
```

### Dados Mock

Para desenvolvimento, o sistema usa arquivos JSON em `mock/db.json`:

```json
{
  "pets": [...],
  "adocoes": [...]
}
```

## 🌐 Deploy

### Deploy Automático (Recomendado)

1. **Instalar Vercel CLI:**
```bash
# Windows (recomendado)
npm install -g vercel

# macOS/Linux
yarn global add vercel
```

2. **Fazer login:**
```bash
vercel login
```

3. **Deploy:**
```bash
yarn mock:deploy
```

### Deploy Manual

1. **Build local:**
```bash
yarn build
```

2. **Deploy no Vercel:**
```bash
vercel --prod
```

### Configuração de Ambiente

**Desenvolvimento (.env.local):**
```env
NEXT_PUBLIC_BASE_API=http://localhost:3002
```

**Produção (Vercel):**
```env
NEXT_PUBLIC_BASE_API=/api  # URL relativa
```

## 📖 Funcionalidades

### 🐕 Adoção de Pets
- ✅ Lista de pets disponíveis
- ✅ Imagens responsivas com fallback
- ✅ Modal de adoção com formulário
- ✅ Validação de dados
- ✅ Feedback visual para usuário

### 👨‍💼 Gestão Administrativa
- ✅ Cadastro de novos pets
- ✅ Relatório de adoções
- ✅ Filtros e busca avançada
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de status

### 🔌 API Robusta
- ✅ Endpoints RESTful
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ CORS configurado
- ✅ Headers de segurança

### 📱 Interface Responsiva
- ✅ Material-UI components
- ✅ Tema customizado
- ✅ Layout adaptável
- ✅ Componentes reutilizáveis
- ✅ Estados de loading

### 🚨 Tratamento de Erros
- ✅ Detecção de rede offline
- ✅ Fallbacks para imagens
- ✅ Mensagens de erro amigáveis
- ✅ Retry automático
- ✅ Estados de carregamento

## 🔗 Scripts Disponíveis

### Desenvolvimento
```bash
yarn dev          # Servidor de desenvolvimento
yarn mock         # API mock local
yarn build        # Build de produção
yarn start        # Servidor de produção
```

### Deploy
```bash
yarn mock:deploy    # Deploy completo
yarn mock:dev       # Deploy preview
yarn mock:preview   # Preview local
```

### Utilitários
```bash
yarn lint          # Linting do código
yarn type-check    # Verificação TypeScript
yarn format        # Formatação do código
```

## 📚 Documentação Técnica

### Arquitetura

O sistema segue a arquitetura **Jamstack** com:

- **Frontend**: Next.js com geração estática/SSR
- **API**: Serverless Functions no Vercel
- **Dados**: JSON files para mock, MySQL para produção
- **Deploy**: Automático via Git hooks

### Componentes Principais

#### `ImagemResponsiva`
Componente para renderização de imagens com fallback:
```tsx
<ImagemResponsiva
  src="/path/to/image.jpg"
  alt="Pet name"
  width={300}
  height={300}
/>
```

#### `useAdocoes` Hook
Hook customizado para gerenciar estado das adoções:
```tsx
const {
  listaAdocoes,
  carregando,
  erro,
  filtro,
  setFiltro
} = useAdocoes();
```

### API Routes

#### GET `/api/pets`
Retorna lista de pets disponíveis:
```json
{
  "id": 1,
  "nome": "Buddy",
  "historia": "Um cão muito amigável...",
  "foto": "https://...",
  "disponivel": true
}
```

#### POST `/api/adocoes`
Cria nova adoção:
```json
{
  "pet_id": 1,
  "email": "usuario@email.com",
  "valor": 50.00
}
```

### Tratamento de Erros

O sistema implementa tratamento robusto de erros:

1. **Detecção de rede offline**
2. **Fallback para dados locais**
3. **Retry automático em falhas**
4. **Mensagens contextuais**
5. **Estados de loading**

### Performance

Otimizações implementadas:

- ⚡ **Next.js**: SSR e static generation
- 🖼️ **Imagens**: Lazy loading e otimização
- 📦 **Bundle**: Code splitting automático
- 🗄️ **Cache**: Estratégias de cache inteligentes
- 🔄 **API**: Endpoints serverless otimizados

### Segurança

Medidas de segurança:

- 🔒 **CORS**: Configurado corretamente
- 🛡️ **Headers**: Security headers aplicados
- ✅ **Validação**: Dados validados no backend
- 🚫 **XSS**: Proteção contra ataques
- 🔐 **Environment**: Variáveis protegidas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🔧 Troubleshooting

### Páginas de Administração Não Carregam

**Problema:** As páginas `/pets/adocoes` e `/pets/relatorio` não abrem ou mostram erro 404.

**Solução:** Next.js usa roteamento baseado em arquivos. As páginas devem estar em `pages/pets/` não em `src/pages/pets/`.

```bash
# Estrutura correta
pages/
  pets/
    adocoes.tsx    ✅ Correto
    relatorio.tsx  ✅ Correto

# Estrutura incorreta  
src/pages/
  pets/
    adocoes.tsx    ❌ Next.js não encontra
    relatorio.tsx  ❌ Next.js não encontra
```

### API Não Funciona Localmente

**Problema:** Erro de conexão com a API ou dados não carregam.

**Solução:** Configure o arquivo `.env.local` corretamente:

```bash
# Para desenvolvimento local
NEXT_PUBLIC_BASE_API=/api

# Para usar API de produção
NEXT_PUBLIC_BASE_API=https://pets-frontend-lwyojegcu-ediaristas.vercel.app/api
```

### Imagens Não Carregam

**Problema:** Imagens dos pets aparecem quebradas ou não carregam.

**Solução:** As imagens usam URLs do Unsplash. Verifique sua conexão com a internet e se as URLs estão corretas no `mock/db.json`.

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Gilberto Aleite**
- GitHub: [@Gilbertoaleite](https://github.com/Gilbertoaleite)
- LinkedIn: [Gilberto Aleite](https://linkedin.com/in/gilbertoaleite)

---

## 🎯 Status do Projeto

✅ **Concluído e Funcionando**

- [x] Interface responsiva
- [x] API serverless funcionando
- [x] Deploy automatizado
- [x] Tratamento de erros robusto
- [x] Documentação completa
- [x] Testes em produção

**URL de Produção:** https://pets-frontend-lwyojegcu-ediaristas.vercel.app

---

⭐ **Se este projeto te ajudou, deixe uma estrela!**

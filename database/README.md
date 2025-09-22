# Schema do Banco de Dados - Sistema de Adoção de Pets

Este diretório contém os scripts SQL para configuração do banco de dados do sistema de adoção de pets.

## 📋 Estrutura do Banco

### Tabelas Principais

#### `pets`
Armazena informações dos animais disponíveis para adoção.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único do pet |
| `nome` | VARCHAR(100) | Nome do animal (mínimo 3 caracteres) |
| `historia` | TEXT | História do animal (mínimo 20 caracteres) |
| `foto` | VARCHAR(500) | URL da foto do animal |
| `disponivel` | BOOLEAN | Se o pet está disponível para adoção |
| `data_cadastro` | TIMESTAMP | Data de cadastro |
| `data_atualizacao` | TIMESTAMP | Data da última atualização |

#### `adocoes`
Registra as adoções realizadas no sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único da adoção |
| `pet_id` | INT (FK) | Referência ao pet adotado |
| `email` | VARCHAR(255) | Email do adotante |
| `valor` | DECIMAL(10,2) | Valor da doação/adoção |
| `data_adocao` | TIMESTAMP | Data da adoção |
| `status` | ENUM | Status da adoção (pendente, aprovada, cancelada) |

### Views

- **`vw_relatorio_adocoes`**: Lista as adoções aprovadas com dados dos pets (compatível com interface TypeScript)
- **`vw_pets_disponiveis`**: Lista apenas pets disponíveis para adoção

## 🚀 Como Usar

### 1. Configuração Completa (Primeira Vez)
```sql
-- Execute o arquivo schema.sql para configuração completa
mysql -u root -p < schema.sql
```

### 2. Migração (Ambiente Existente)
```sql
-- Execute apenas a migração para aplicar mudanças
USE pets_adoption_system;
mysql -u root -p pets_adoption_system < migration_001_initial_setup.sql
```

### 3. Criar apenas as tabelas (sem dados de exemplo)
```sql
-- Execute comandos específicos do arquivo de migração
mysql -u root -p pets_adoption_system
```

## 🛠️ Recursos Avançados

### Triggers Implementados
- **`trg_pet_adotado`**: Marca pet como indisponível após adoção aprovada
- **`trg_pet_disponivel`**: Torna pet disponível novamente se adoção for cancelada

### Stored Procedure
- **`sp_adotar_pet`**: Procedure para realizar adoção com validações

### Funções
- **`fn_contar_pets_disponiveis()`**: Retorna quantidade de pets disponíveis

## 📊 Queries Úteis

### Listar pets disponíveis
```sql
SELECT * FROM vw_pets_disponiveis;
```

### Relatório de adoções
```sql
SELECT * FROM vw_relatorio_adocoes;
```

### Adotar um pet (usando procedure)
```sql
CALL sp_adotar_pet(1, 'adotante@email.com', 150.00);
```

### Contar pets disponíveis
```sql
SELECT fn_contar_pets_disponiveis() as total_disponiveis;
```

## 🔒 Constraints e Validações

- Nome do pet deve ter pelo menos 3 caracteres
- História deve ter pelo menos 20 caracteres  
- URL da foto deve ter pelo menos 5 caracteres
- Email deve ter formato válido
- Valor de adoção deve ser positivo
- Relacionamento com integridade referencial entre pets e adoções

## 🎯 Compatibilidade com Frontend

O schema foi projetado para ser totalmente compatível com as interfaces TypeScript:

```typescript
// Interface Pet (Pet.ts)
interface Pet {
    id: number;
    nome: string;
    historia: string;
    foto: string;
}

// Interface Relatorio (Relatorio.ts)  
interface Relatorio {
    id: number;
    email: string;
    valor: string;
    pet: Pet;
}
```

## 🗄️ Backup e Restauração

### Criar backup
```bash
mysqldump -u root -p pets_adoption_system > backup_pets_$(date +%Y%m%d).sql
```

### Restaurar backup
```bash
mysql -u root -p pets_adoption_system < backup_pets_YYYYMMDD.sql
```

## ⚡ Performance

### Índices Criados
- `idx_pet_id` em `adocoes.pet_id`
- `idx_email` em `adocoes.email` 
- `idx_data_adocao` em `adocoes.data_adocao`

### Recomendações
- Use a view `vw_pets_disponiveis` para listar pets na página inicial
- Use a view `vw_relatorio_adocoes` para relatórios
- Execute `ANALYZE TABLE` periodicamente para manter estatísticas atualizadas

## 🛡️ Segurança

- Constraints aplicadas em nível de banco
- Validação de formato de email
- Relacionamentos com integridade referencial
- Triggers para manter consistência dos dados

## 📝 Versionamento

- **v1.0.0**: Setup inicial com tabelas pets e adocoes
- Próximas versões: adicione novos arquivos de migração seguindo o padrão `migration_XXX_nome_da_alteracao.sql`
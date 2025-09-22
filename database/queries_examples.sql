-- ==============================================
-- EXEMPLOS DE QUERIES PARA APIs
-- Sistema de Adoção de Pets
-- ==============================================

-- ==============================================
-- 1. ENDPOINT: GET /pets
-- Retorna lista de pets disponíveis para adoção
-- ==============================================

SELECT
    id,
    nome,
    historia,
    foto
FROM pets
WHERE disponivel = TRUE
ORDER BY data_cadastro DESC;

-- ==============================================
-- 2. ENDPOINT: POST /pets
-- Cadastra um novo pet no sistema
-- ==============================================

-- Exemplo de INSERT (executado pelo backend após validações)
INSERT INTO pets
    (nome, historia, foto)
VALUES
    (?, ?, ?);

-- Query para validar se dados estão corretos antes do INSERT
SELECT
    CASE 
        WHEN CHAR_LENGTH(?) >= 3 THEN 'OK'
        ELSE 'Nome deve ter pelo menos 3 caracteres'
    END as validacao_nome,
    CASE 
        WHEN CHAR_LENGTH(?) >= 20 THEN 'OK'
        ELSE 'História deve ter pelo menos 20 caracteres'
    END as validacao_historia,
    CASE 
        WHEN CHAR_LENGTH(?) >= 5 THEN 'OK'
        ELSE 'URL da foto deve ter pelo menos 5 caracteres'
    END as validacao_foto;

-- ==============================================
-- 3. ENDPOINT: GET /adocoes
-- Retorna relatório de adoções (para relatório)
-- ==============================================

SELECT
    a.id,
    a.email,
    CAST(a.valor AS CHAR) as valor,
    JSON_OBJECT(
        'id', p.id,
        'nome', p.nome,
        'historia', p.historia,
        'foto', p.foto
    ) as pet,
    a.data_adocao
FROM adocoes a
    INNER JOIN pets p ON a.pet_id = p.id
WHERE a.status = 'aprovada'
ORDER BY a.data_adocao DESC;

-- Alternativa usando a view criada
SELECT *
FROM vw_relatorio_adocoes;

-- ==============================================
-- 4. ENDPOINT: POST /adocoes
-- Registra uma nova adoção
-- ==============================================

-- Primeiro, verificar se o pet está disponível
SELECT
    id,
    nome,
    disponivel
FROM pets
WHERE id = ? AND disponivel = TRUE;

-- Se disponível, inserir a adoção
INSERT INTO adocoes
    (pet_id, email, valor, status)
VALUES
    (?, ?, ?, 'aprovada');

-- Marcar o pet como indisponível
UPDATE pets 
SET disponivel = FALSE 
WHERE id = ?;

-- ==============================================
-- 5. QUERIES PARA VALIDAÇÕES
-- ==============================================

-- Validar formato de email
SELECT
    CASE 
        WHEN ? REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' THEN 'válido'
        ELSE 'inválido'
    END as email_valido;

-- Verificar se pet existe e está disponível
SELECT COUNT(*) as disponivel
FROM pets
WHERE id = ? AND disponivel = TRUE;

-- ==============================================
-- 6. QUERIES PARA ESTATÍSTICAS (OPCIONAL)
-- ==============================================

-- Contar pets disponíveis
SELECT COUNT(*) as total_pets_disponiveis
FROM pets
WHERE disponivel = TRUE;

-- Contar total de adoções por mês
SELECT
    YEAR(data_adocao) as ano,
    MONTH(data_adocao) as mes,
    COUNT(*) as total_adocoes
FROM adocoes
WHERE status = 'aprovada'
GROUP BY YEAR(data_adocao), MONTH(data_adocao)
ORDER BY ano DESC, mes DESC;

-- Top 5 pets mais procurados (com mais tentativas de adoção)
SELECT
    p.nome,
    p.foto,
    COUNT(a.id) as tentativas_adocao
FROM pets p
    LEFT JOIN adocoes a ON p.id = a.pet_id
GROUP BY p.id, p.nome, p.foto
ORDER BY tentativas_adocao DESC
LIMIT 5;

-- ==============================================
-- 7. LIMPEZA E MANUTENÇÃO
-- ==============================================

-- Limpar adoções canceladas antigas (mais de 30 dias)
DELETE FROM adocoes
WHERE status = 'cancelada' 
AND data_adocao < DATE_SUB
(NOW
(), INTERVAL 30 DAY);

-- Reativar pets que não foram adotados (caso necessário)
UPDATE pets 
SET disponivel = TRUE 
WHERE id NOT IN (
    SELECT pet_id
FROM adocoes
WHERE status = 'aprovada'
);

-- ==============================================
-- 8. BACKUP DE DADOS SENSÍVEIS
-- ==============================================

-- Criar tabela de log para auditoria (opcional)
CREATE TABLE
IF NOT EXISTS log_adocoes
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    acao VARCHAR
(50),
    pet_id INT,
    email VARCHAR
(255),
    valor DECIMAL
(10,2),
    data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario VARCHAR
(100),
    ip VARCHAR
(45)
);

-- ==============================================
-- 9. TESTING - DADOS PARA DESENVOLVIMENTO
-- ==============================================

-- Inserir dados de teste
INSERT INTO pets
    (nome, historia, foto)
VALUES
    ('Pet Teste 1', 'Esta é uma história de teste com mais de vinte caracteres para validar o sistema.', 'https://exemplo.com/teste1.jpg'),
    ('Pet Teste 2', 'Outra história de teste que também tem mais de vinte caracteres para o sistema funcionar.', 'https://exemplo.com/teste2.jpg');

-- Simular algumas adoções de teste
INSERT INTO adocoes
    (pet_id, email, valor, status)
VALUES
    (1, 'teste1@exemplo.com', 100.00, 'aprovada'),
    (2, 'teste2@exemplo.com', 150.50, 'pendente');

-- ==============================================
-- 10. MONITORAMENTO DE PERFORMANCE
-- ==============================================

-- Verificar uso dos índices
SHOW INDEX FROM pets;
SHOW INDEX FROM adocoes;

-- Analisar queries lentas (ativar slow query log)
-- SET global slow_query_log = 'ON';
-- SET global long_query_time = 2;

-- Verificar tamanho das tabelas
SELECT
    table_name,
    table_rows,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables
WHERE table_schema = 'pets_adoption_system'
ORDER BY size_mb DESC;
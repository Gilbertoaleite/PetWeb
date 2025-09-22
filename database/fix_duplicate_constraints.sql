-- ==============================================
-- CORREÇÃO DE CONSTRAINTS DUPLICADAS
-- Execute este script se você receber erro de constraint duplicada
-- ==============================================

-- Remover constraints existentes (se existirem)
ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_nome_length;

ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_historia_length;

ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_foto_length;

-- Remover constraints de adocoes (se existirem)
ALTER TABLE adocoes DROP CONSTRAINT IF EXISTS chk_email_format;

ALTER TABLE adocoes DROP CONSTRAINT IF EXISTS chk_valor_positivo;

-- Recriar constraints com nomes únicos
ALTER TABLE pets
ADD CONSTRAINT chk_pets_nome_length CHECK (CHAR_LENGTH(nome) >= 3),
ADD CONSTRAINT chk_pets_historia_length CHECK (CHAR_LENGTH(historia) >= 20),
ADD CONSTRAINT chk_pets_foto_length CHECK (CHAR_LENGTH(foto) >= 5);

-- Recriar constraints de adocoes
ALTER TABLE adocoes
ADD CONSTRAINT chk_adocoes_email_format CHECK (
    email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
),
ADD CONSTRAINT chk_adocoes_valor_positivo CHECK (valor > 0);

-- Verificar se constraints foram criadas
SELECT
    CONSTRAINT_NAME,
    TABLE_NAME,
    CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE
    TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME IN ('pets', 'adocoes')
    AND CONSTRAINT_TYPE = 'CHECK'
ORDER BY TABLE_NAME, CONSTRAINT_NAME;
-- ==============================================
-- MIGRAÇÃO SEGURA - Evita erros de duplicação
-- Execute este script para aplicar mudanças sem erros
-- ==============================================

-- Procedure para adicionar constraint apenas se não existir
DELIMITER $$

CREATE PROCEDURE AddConstraintIfNotExists(
    IN table_name VARCHAR(64),
    IN constraint_name VARCHAR(64), 
    IN constraint_definition TEXT
)
BEGIN
    DECLARE constraint_exists INT DEFAULT 0;
    
    -- Verificar se constraint já existe
    SELECT COUNT(*) INTO constraint_exists
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = table_name
    AND CONSTRAINT_NAME = constraint_name;
    
    -- Adicionar constraint apenas se não existir
    IF constraint_exists = 0 THEN
        SET @sql = CONCAT('ALTER TABLE ', table_name, ' ADD CONSTRAINT ', constraint_name, ' ', constraint_definition);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        SELECT CONCAT('Constraint ', constraint_name, ' adicionada com sucesso') as resultado;
    ELSE
        SELECT CONCAT('Constraint ', constraint_name, ' já existe') as resultado;
    END IF;
END$$

DELIMITER;

-- Aplicar constraints usando a procedure
CALL AddConstraintIfNotExists (
    'pets',
    'chk_nome_length',
    'CHECK (CHAR_LENGTH(nome) >= 3)'
);

CALL AddConstraintIfNotExists (
    'pets',
    'chk_historia_length',
    'CHECK (CHAR_LENGTH(historia) >= 20)'
);

CALL AddConstraintIfNotExists (
    'pets',
    'chk_foto_length',
    'CHECK (CHAR_LENGTH(foto) >= 5)'
);

CALL AddConstraintIfNotExists (
    'adocoes',
    'chk_email_format',
    'CHECK (email REGEXP "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")'
);

CALL AddConstraintIfNotExists (
    'adocoes',
    'chk_valor_positivo',
    'CHECK (valor > 0)'
);

-- Limpar procedure temporária
DROP PROCEDURE IF EXISTS AddConstraintIfNotExists;

-- Verificar resultado final
SELECT
    TABLE_NAME,
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE
    TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME IN ('pets', 'adocoes')
ORDER BY TABLE_NAME, CONSTRAINT_NAME;
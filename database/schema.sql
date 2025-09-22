-- Schema do Banco de Dados para Sistema de Adoção de Pets
-- Database: pets_adoption_system

-- ==============================================
-- Criação do Banco de Dados
-- ==============================================

CREATE DATABASE
IF NOT EXISTS pets_adoption_system 
CHARACTER
SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pets_adoption_system;

-- ==============================================
-- Tabela: pets
-- Armazena informações dos animais disponíveis para adoção
-- ==============================================

CREATE TABLE pets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR
(100) NOT NULL,
    historia TEXT NOT NULL,
    foto VARCHAR
(500) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_nome_length
CHECK
(CHAR_LENGTH
(nome) >= 3),
    CONSTRAINT chk_historia_length CHECK
(CHAR_LENGTH
(historia) >= 20),
    CONSTRAINT chk_foto_length CHECK
(CHAR_LENGTH
(foto) >= 5)
);

-- ==============================================
-- Tabela: adocoes
-- Registra as adoções realizadas
-- ==============================================

CREATE TABLE adocoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT NOT NULL,
    email VARCHAR
(255) NOT NULL,
    valor DECIMAL
(10,2) NOT NULL,
    data_adocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM
('pendente', 'aprovada', 'cancelada') DEFAULT 'pendente',
    
    -- Foreign Keys
    CONSTRAINT fk_adocao_pet FOREIGN KEY
(pet_id) REFERENCES pets
(id) ON
DELETE CASCADE,
    
    -- Constraints
    CONSTRAINT chk_email_format CHECK
(email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_valor_positivo CHECK
(valor > 0),
    
    -- Indexes
    INDEX idx_pet_id
(pet_id),
    INDEX idx_email
(email),
    INDEX idx_data_adocao
(data_adocao)
);

-- ==============================================
-- Triggers
-- ==============================================

-- Trigger para marcar pet como indisponível após adoção aprovada
DELIMITER //
CREATE TRIGGER trg_pet_adotado 
AFTER
UPDATE ON adocoes
FOR EACH ROW
BEGIN
    IF NEW.status = 'aprovada' AND OLD.status != 'aprovada' THEN
    UPDATE pets 
        SET disponivel = FALSE 
        WHERE id = NEW.pet_id;
END
IF;
END//
DELIMITER ;

-- Trigger para tornar pet disponível novamente se adoção for cancelada
DELIMITER //
CREATE TRIGGER trg_pet_disponivel 
AFTER
UPDATE ON adocoes
FOR EACH ROW
BEGIN
    IF NEW.status = 'cancelada' AND OLD.status != 'cancelada' THEN
    UPDATE pets 
        SET disponivel = TRUE 
        WHERE id = NEW.pet_id;
END
IF;
END//
DELIMITER ;

-- ==============================================
-- Views
-- ==============================================

-- View para relatórios de adoção (compatível com interface Relatorio.ts)
CREATE VIEW vw_relatorio_adocoes
AS
    SELECT
        a.id,
        a.email,
        a.valor,
        p.id as pet_id,
        p.nome as pet_nome,
        p.historia as pet_historia,
        p.foto as pet_foto,
        a.data_adocao,
        a.status
    FROM adocoes a
        INNER JOIN pets p ON a.pet_id = p.id
    WHERE a.status = 'aprovada'
    ORDER BY a.data_adocao DESC;

-- View para pets disponíveis
CREATE VIEW vw_pets_disponiveis
AS
    SELECT
        id,
        nome,
        historia,
        foto,
        data_cadastro
    FROM pets
    WHERE disponivel = TRUE
    ORDER BY data_cadastro DESC;

-- ==============================================
-- Dados de Exemplo (Opcional)
-- ==============================================

-- Inserindo pets de exemplo
INSERT INTO pets
    (nome, historia, foto)
VALUES
    ('Buddy', 'Buddy é um Golden Retriever muito carinhoso e brincalhão. Foi encontrado abandonado na rua quando ainda era filhote. Agora está recuperado e procura uma família amorosa.', 'https://exemplo.com/buddy.jpg'),
    ('Luna', 'Luna é uma gata persa de 2 anos, muito tranquila e carinhosa. Sua antiga família precisou se mudar e não pôde levá-la. Ela adora carinho e é muito sociável.', 'https://exemplo.com/luna.jpg'),
    ('Max', 'Max é um vira-lata de porte médio, muito inteligente e fiel. Foi resgatado de maus-tratos e já está completamente recuperado. É ideal para famílias com crianças.', 'https://exemplo.com/max.jpg');

-- ==============================================
-- Procedimentos Armazenados
-- ==============================================

-- Procedure para adotar um pet
DELIMITER //
CREATE PROCEDURE sp_adotar_pet(
    IN p_pet_id INT,
    IN p_email VARCHAR
(255),
    IN p_valor DECIMAL
(10,2)
)
BEGIN
    DECLARE pet_disponivel BOOLEAN DEFAULT FALSE;

    -- Verificar se o pet está disponível
    SELECT disponivel
    INTO pet_disponivel
    FROM pets
    WHERE id = p_pet_id;

    IF pet_disponivel THEN
    -- Inserir registro de adoção
    INSERT INTO adocoes
        (pet_id, email, valor, status)
    VALUES
        (p_pet_id, p_email, p_valor, 'aprovada');

    -- Marcar pet como indisponível
    UPDATE pets 
        SET disponivel = FALSE 
        WHERE id = p_pet_id;

    SELECT 'Pet adotado com sucesso!' as mensagem;
    ELSE
        SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT
    = 'Pet não está disponível para adoção';
END
IF;
END//
DELIMITER ;

-- ==============================================
-- Funções
-- ==============================================

-- Função para contar pets disponíveis
DELIMITER //
CREATE FUNCTION fn_contar_pets_disponiveis()
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE total INT DEFAULT 0;

    SELECT COUNT(*)
    INTO total
    FROM pets
    WHERE disponivel = TRUE;

    RETURN total;
END
//
DELIMITER ;

-- ==============================================
-- Comentários das Tabelas e Colunas
-- ==============================================

-- Adicionando comentários para documentação
ALTER TABLE pets COMMENT = 'Tabela que armazena informações dos pets disponíveis para adoção';
ALTER TABLE adocoes COMMENT = 'Tabela que registra todas as adoções realizadas no sistema';

-- ==============================================
-- Usuários e Permissões (Opcional)
-- ==============================================

-- Criar usuário específico para a aplicação
-- CREATE USER 'pets_app'@'localhost' IDENTIFIED BY 'senha_segura';
-- GRANT SELECT, INSERT, UPDATE ON pets_adoption_system.* TO 'pets_app'@'localhost';
-- FLUSH PRIVILEGES;
-- ==============================================
-- Migração: Criação inicial do banco de dados
-- Versão: 1.0.0
-- Data: 21/09/2025
-- Descrição: Criação das tabelas iniciais para o sistema de adoção de pets
-- ==============================================

-- Definir charset para evitar problemas com acentuação
SET NAMES utf8mb4;

SET CHARACTER SET utf8mb4;

-- ==============================================
-- TABELA: pets
-- ==============================================

-- Remover constraints existentes para evitar duplicatas
ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_nome_length;

ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_historia_length;

ALTER TABLE pets DROP CONSTRAINT IF EXISTS chk_foto_length;

-- Remover tabelas se existirem para recriação limpa
DROP TABLE IF EXISTS adocoes;

DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    historia TEXT NOT NULL,
    foto VARCHAR(500) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Adicionar constraints após criação da tabela
ALTER TABLE pets
ADD CONSTRAINT chk_nome_length CHECK (CHAR_LENGTH(nome) >= 3),
ADD CONSTRAINT chk_historia_length CHECK (CHAR_LENGTH(historia) >= 20),
ADD CONSTRAINT chk_foto_length CHECK (CHAR_LENGTH(foto) >= 5);

-- ==============================================
-- TABELA: adocoes
-- ==============================================

CREATE TABLE adocoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_adocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM(
        'pendente',
        'aprovada',
        'cancelada'
    ) DEFAULT 'pendente'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Adicionar foreign key e constraints
ALTER TABLE adocoes
ADD CONSTRAINT fk_adocao_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE;

ALTER TABLE adocoes
ADD CONSTRAINT chk_email_format CHECK (
    email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
),
ADD CONSTRAINT chk_valor_positivo CHECK (valor > 0);

-- Adicionar índices
CREATE INDEX idx_pet_id ON adocoes (pet_id);

CREATE INDEX idx_email ON adocoes (email);

CREATE INDEX idx_data_adocao ON adocoes (data_adocao);

-- ==============================================
-- VIEWS
-- ==============================================

-- View para relatórios (compatível com interface TypeScript)
CREATE VIEW vw_relatorio_adocoes AS
SELECT a.id, a.email, CAST(a.valor AS CHAR) as valor, JSON_OBJECT(
        'id', p.id, 'nome', p.nome, 'historia', p.historia, 'foto', p.foto
    ) as pet, a.data_adocao, a.status
FROM adocoes a
    INNER JOIN pets p ON a.pet_id = p.id
WHERE
    a.status = 'aprovada'
ORDER BY a.data_adocao DESC;

-- View para pets disponíveis
CREATE VIEW vw_pets_disponiveis AS
SELECT
    id,
    nome,
    historia,
    foto,
    data_cadastro
FROM pets
WHERE
    disponivel = TRUE
ORDER BY data_cadastro DESC;

-- ==============================================
-- DADOS INICIAIS (SEEDS)
-- ==============================================

-- Inserir dados de exemplo apenas se não existirem
INSERT IGNORE INTO
    pets (id, nome, historia, foto)
VALUES (
        1,
        'Buddy',
        'Buddy é um Golden Retriever muito carinhoso e brincalhão. Foi encontrado abandonado na rua quando ainda era filhote. Agora está recuperado e procura uma família amorosa para dar muito amor e alegria.',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500'
    ),
    (
        2,
        'Luna',
        'Luna é uma gata persa de 2 anos, muito tranquila e carinhosa. Sua antiga família precisou se mudar para outro país e não pôde levá-la. Ela adora carinho, é muito sociável e se dá bem com crianças.',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'
    ),
    (
        3,
        'Max',
        'Max é um vira-lata de porte médio, muito inteligente e fiel. Foi resgatado de maus-tratos quando era jovem e já está completamente recuperado. É ideal para famílias com crianças e se adapta bem a apartamentos.',
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'
    ),
    (
        4,
        'Bella',
        'Bella é uma Border Collie muito ativa e inteligente. Sua família anterior não tinha tempo suficiente para dar a atenção que ela merecia. Precisa de uma família que goste de atividades ao ar livre e exercícios regulares.',
        'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=500'
    ),
    (
        5,
        'Mimi',
        'Mimi é uma gatinha de 1 ano, muito brincalhona e curiosa. Foi encontrada ainda filhote e criada com muito carinho. É perfeita para quem busca um companheiro alegre e cheio de energia para animar o lar.',
        'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500'
    );

-- ==============================================
-- COMENTÁRIOS FINAIS
-- ==============================================

-- Definir comentários nas tabelas
ALTER TABLE pets COMMENT = 'Armazena dados dos pets disponíveis para adoção';

ALTER TABLE adocoes COMMENT = 'Registra todas as adoções realizadas no sistema';

-- Log de execução
SELECT 'Migração executada com sucesso!' as status, NOW() as data_execucao;
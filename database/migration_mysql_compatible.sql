-- ==============================================
-- Migração: Criação inicial do banco de dados - MySQL
-- Versão: 1.0.0
-- Data: 21/09/2025
-- Descrição: Schema para sistema de adoção de pets (compatível MySQL)
-- ==============================================

-- Criar banco se não existir
-- CREATE DATABASE IF NOT EXISTS pets_adoption_system;
-- USE pets_adoption_system;

-- ==============================================
-- TABELA: pets
-- ==============================================

DROP TABLE IF EXISTS adocoes;
DROP TABLE IF EXISTS pets;

CREATE TABLE pets
(
    id INT
    AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR
    (100) NOT NULL,
    historia TEXT NOT NULL,
    foto VARCHAR
    (500) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
    UPDATE CURRENT_TIMESTAMP
    );

    -- ==============================================
    -- TABELA: adocoes
    -- ==============================================

    CREATE TABLE adocoes
    (
        id INT
        AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    email VARCHAR
        (255) NOT NULL,
    valor DECIMAL
        (10,2) NOT NULL,
    data_adocao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM
        ('pendente', 'aprovada', 'cancelada') DEFAULT 'pendente',
    FOREIGN KEY
        (pet_id) REFERENCES pets
        (id) ON
        DELETE CASCADE
);

        -- ==============================================
        -- ÍNDICES
        -- ==============================================

        CREATE INDEX idx_pet_id ON adocoes(pet_id);
        CREATE INDEX idx_email ON adocoes(email);
        CREATE INDEX idx_data_adocao ON adocoes(data_adocao);

        -- ==============================================
        -- CONSTRAINTS
        -- ==============================================

        ALTER TABLE pets 
ADD CONSTRAINT chk_nome_length CHECK (LENGTH(nome) >= 3);

        ALTER TABLE pets 
ADD CONSTRAINT chk_historia_length CHECK (LENGTH(historia) >= 20);

        ALTER TABLE pets 
ADD CONSTRAINT chk_foto_length CHECK (LENGTH(foto) >= 5);

        ALTER TABLE adocoes 
ADD CONSTRAINT chk_valor_positivo CHECK (valor > 0);

        -- ==============================================
        -- VIEWS
        -- ==============================================

        DROP VIEW IF EXISTS vw_relatorio_adocoes;
        CREATE VIEW vw_relatorio_adocoes
        AS
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
                a.data_adocao,
                a.status
            FROM adocoes a
                INNER JOIN pets p ON a.pet_id = p.id
            WHERE a.status = 'aprovada'
            ORDER BY a.data_adocao DESC;

        DROP VIEW IF EXISTS vw_pets_disponiveis;
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
        -- DADOS INICIAIS (SEEDS)
        -- ==============================================

        INSERT INTO pets
            (nome, historia, foto)
        VALUES
            ('Buddy', 'Buddy é um Golden Retriever muito carinhoso e brincalhão. Foi encontrado abandonado na rua quando ainda era filhote. Agora está recuperado e procura uma família amorosa para dar muito amor e alegria.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500'),
            ('Luna', 'Luna é uma gata persa de 2 anos, muito tranquila e carinhosa. Sua antiga família precisou se mudar para outro país e não pôde levá-la. Ela adora carinho, é muito sociável e se dá bem com crianças.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'),
            ('Max', 'Max é um vira-lata de porte médio, muito inteligente e fiel. Foi resgatado de maus-tratos quando era jovem e já está completamente recuperado. É ideal para famílias com crianças e se adapta bem a apartamentos.', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500'),
            ('Bella', 'Bella é uma Border Collie muito ativa e inteligente. Sua família anterior não tinha tempo suficiente para dar a atenção que ela merecia. Precisa de uma família que goste de atividades ao ar livre e exercícios regulares.', 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=500'),
            ('Mimi', 'Mimi é uma gatinha de 1 ano, muito brincalhona e curiosa. Foi encontrada ainda filhote e criada com muito carinho. É perfeita para quem busca um companheiro alegre e cheio de energia para animar o lar.', 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500');

        -- ==============================================
        -- COMENTÁRIOS FINAIS
        -- ==============================================

        -- Executar para verificar se as tabelas foram criadas
        SELECT 'Migração executada com sucesso!' as status, NOW() as data_execucao;
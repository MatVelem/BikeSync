-- Criação do banco de dados
DROP DATABASE IF EXISTS BikeSync3;
CREATE DATABASE BikeSync3;
USE BikeSync3;

-- Tabela Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(50),
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    endereco TEXT,
    status BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_cpf_format CHECK (cpf REGEXP '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$')
);
CREATE INDEX idx_usuario_email ON Usuario(email);

-- Tabela Marca
CREATE TABLE Marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nome_marca VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela Bicicleta
CREATE TABLE Bicicleta (
    id_bicicleta INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(50),
    ano INT,
    tamanho_roda INT CHECK (tamanho_roda IN (26, 27, 27.5, 28, 29)),
    serial VARCHAR(50) UNIQUE,
    tipo VARCHAR(50),
    cor VARCHAR(30),
    material VARCHAR(50),
    kit_transmissao VARCHAR(50),
    tamanho_quadro VARCHAR(10),
    informacoes_adicionais TEXT,
    id_usuario INT,
    id_marca INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_marca) REFERENCES Marca(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_bicicleta_usuario ON Bicicleta(id_usuario);

-- Tabela Lojista
CREATE TABLE Lojista (
    id_lojista INT AUTO_INCREMENT PRIMARY KEY,
    nome_loja VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    endereco TEXT,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT chk_cnpj_format CHECK (cnpj REGEXP '^[0-9]{2}\\.[0-9]{3}\\.[0-9]{3}/[0-9]{4}-[0-9]{2}$')
);
CREATE INDEX idx_lojista_email ON Lojista(email);

-- Tabela TipoServico
CREATE TABLE TipoServico (
    id_tipo_servico INT AUTO_INCREMENT PRIMARY KEY,
    nome_tipo VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    preco DECIMAL(10, 2),
    lojista_id INT,
    CONSTRAINT fk_lojista_tipo_servico
        FOREIGN KEY (lojista_id) REFERENCES Lojista(id_lojista)
);

-- Tabela Servicos
CREATE TABLE Servicos (
    id_servico INT AUTO_INCREMENT PRIMARY KEY,
    preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
    data_servico DATE,
    status ENUM('Pendente', 'Concluido', 'Cancelado') DEFAULT 'Pendente',
    id_bicicleta INT,
    id_lojista INT,
    id_tipo_servico INT,
    FOREIGN KEY (id_bicicleta) REFERENCES Bicicleta(id_bicicleta) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_lojista) REFERENCES Lojista(id_lojista) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_tipo_servico) REFERENCES TipoServico(id_tipo_servico) ON DELETE RESTRICT ON UPDATE CASCADE
);
ALTER TABLE Servicos ADD COLUMN status ENUM('Pendente', 'Pago', 'Cancelado') DEFAULT 'Pendente';
CREATE INDEX idx_servicos_bicicleta ON Servicos(id_bicicleta);
CREATE INDEX idx_servicos_lojista ON Servicos(id_lojista);

-- Tabela OrdemServico
CREATE TABLE OrdemServico (
    id_ordem_servico INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    valor DECIMAL(10,2) CHECK (valor >= 0),
    forma_pagamento ENUM('Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Pix') DEFAULT 'Dinheiro',
    observacoes TEXT,
    status_pagamento ENUM('Pendente', 'Pago', 'Falhou') NOT NULL DEFAULT 'Pendente',
    id_bicicleta INT,
    id_lojista INT,
    id_usuario INT,
    FOREIGN KEY (id_bicicleta) REFERENCES Bicicleta(id_bicicleta) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_lojista) REFERENCES Lojista(id_lojista) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_ordemservico_bicicleta ON OrdemServico(id_bicicleta);
CREATE INDEX idx_ordemservico_lojista ON OrdemServico(id_lojista);
CREATE INDEX idx_ordemservico_usuario ON OrdemServico(id_usuario);


ALTER TABLE OrdemServico 
ADD COLUMN id_tipo_servico INT NOT NULL,
ADD FOREIGN KEY (id_tipo_servico) REFERENCES TipoServico(id_tipo_servico);

ALTER TABLE OrdemServico ADD COLUMN status ENUM('Pendente', 'Aceito', 'Cancelado') DEFAULT 'Pendente';

-- Tabela AlertaManutencao
CREATE TABLE AlertaManutencao (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    data DATE ,
    horario TIME ,
    quilometragem INT,
    ultima_manutencao DATE,
    quilometragem_atual INT,
    quilometragem_maxima INT,
    horas_maximas INT,
    dias_maximos INT,
    id_bicicleta INT,
    id_usuario INT,
    FOREIGN KEY (id_bicicleta) REFERENCES Bicicleta(id_bicicleta) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_alertamanutencao_usuario ON AlertaManutencao(id_usuario);
CREATE INDEX idx_alertamanutencao_bicicleta ON AlertaManutencao(id_bicicleta);

-- Tabela Feedback
CREATE TABLE Feedback (
    id_feedback INT AUTO_INCREMENT PRIMARY KEY,
    avaliacao INT NOT NULL CHECK (avaliacao BETWEEN 1 AND 5),
    comentario TEXT,
    data DATE ,
    id_ordem_servico INT,
    id_servico INT,
    id_usuario INT,
    FOREIGN KEY (id_ordem_servico) REFERENCES OrdemServico(id_ordem_servico) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_feedback_ordemservico ON Feedback(id_ordem_servico);
CREATE INDEX idx_feedback_servico ON Feedback(id_servico);
CREATE INDEX idx_feedback_usuario ON Feedback(id_usuario);

-- Tabela Historico
CREATE TABLE Historico (
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT,
    data_registro DATE,
    id_bicicleta INT,
    id_servico INT,
    FOREIGN KEY (id_bicicleta) REFERENCES Bicicleta(id_bicicleta) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_historico_bicicleta ON Historico(id_bicicleta);
CREATE INDEX idx_historico_servico ON Historico(id_servico);

-- Tabela Chat
CREATE TABLE Chat (
    id_chat INT AUTO_INCREMENT PRIMARY KEY,
    mensagem TEXT NOT NULL,
    data_envio DATE,
    id_usuario INT,
    id_lojista INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_lojista) REFERENCES Lojista(id_lojista) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_chat_usuario ON Chat(id_usuario);
CREATE INDEX idx_chat_lojista ON Chat(id_lojista);

-- Tabela Relatorios
CREATE TABLE Relatorios (
    id_relatorio INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    data_geracao DATE,
    conteudo TEXT,
    id_lojista INT,
    FOREIGN KEY (id_lojista) REFERENCES Lojista(id_lojista) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_relatorios_lojista ON Relatorios(id_lojista);

-- Tabela RelatorioCliente
CREATE TABLE RelatorioCliente (
    id_relatorio_cliente INT AUTO_INCREMENT PRIMARY KEY,
    data_geracao DATE,
    conteudo TEXT NOT NULL,
    formato ENUM('PDF', 'HTML') NOT NULL DEFAULT 'PDF',
    id_usuario INT NOT NULL,
    id_ordem_servico INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (id_ordem_servico) REFERENCES OrdemServico(id_ordem_servico) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX idx_relatoriocliente_usuario ON RelatorioCliente(id_usuario);
CREATE INDEX idx_relatoriocliente_ordemservico ON RelatorioCliente(id_ordem_servico);

INSERT INTO Usuario (nome, email, senha, nacionalidade, telefone, cpf, endereco, status) VALUES
('João Silva', 'joao.silva@example.com', 'senha123', 'Brasil', '99999-9999', '123.456.789-00', 'Rua Exemplo, 123', TRUE),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', 'Brasil', '99999-8888', '234.567.890-11', 'Rua das Flores, 99', TRUE),
('Carlos Lima', 'carlos.lima@example.com', 'senha789', 'Brasil', '99999-7777', '345.678.901-22', 'Avenida Central, 1001', TRUE),
('Fernanda Souza', 'fernanda.souza@example.com', 'senha321', 'Portugal', '35199999-1234', '325.618.901-72', 'Rua Alentejo, 200', TRUE),
('Rafael Mendes', 'rafael.mendes@example.com', 'senha555', 'Brasil', '99999-6666', '456.789.012-33', 'Rua Alegria, 45', TRUE);

-- Inserindo dados na tabela Marca
INSERT INTO Marca (nome_marca) VALUES
('Specialized'),
('Caloi'),
('Trek'),
('Cannondale'),
('Scott');

-- Inserindo dados na tabela Bicicleta
INSERT INTO Bicicleta (modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario, id_marca) VALUES
('Rockhopper', 2020, 29, '12345SERIAL', 'Mountain Bike', 'Preto', 'Alumínio', 'Shimano', 'M', 'Ótima para trilhas', 1, 1),
('Elite Carbon', 2021, 29, 'CALOI1234', 'Mountain Bike', 'Vermelho', 'Carbono', 'SRAM', 'M', 'Suspensão RockShox', 2, 2),
('Domane SL7', 2022, 28, 'TREK5678', 'Speed', 'Preto', 'Carbono', 'Shimano Ultegra', 'M', 'Quadro leve e ágil', 3, 3),
('Tarmac SL6', 2023, 28, 'SPEC7890', 'Speed', 'Branco', 'Alumínio', 'Shimano 105', 'L', 'Ajuste aerodinâmico', 4, 1),
('SuperSix Evo', 2020, 27, 'CANN8970', 'Speed', 'Cinza', 'Carbono', 'Campagnolo', 'S', 'Design de alta performance', 5, 4);

-- Inserindo dados na tabela Lojista
INSERT INTO Lojista (nome_loja, cnpj, telefone, endereco, senha, email) VALUES
('Loja BikeFast', '12.345.678/0001-99', '3333-3333', 'Avenida das Bicicletas, 456', 'senha123', 'contato@bikefast.com'),
('Loja BikeTop', '99.123.456/0001-00', '5555-1111', 'Rua das Bicicletas, 55', 'senha2345', 'contato@biketop.com'),
('Pedal Forte', '77.987.654/0001-22', '5555-2222', 'Avenida do Esporte, 200', 'senha3456', 'pedalforte@esporte.com'),
('BiciMania', '66.333.222/0001-11', '5555-3333', 'Rua Velocidade, 88', 'senha4567', 'bicimania@fastmail.com'),
('Ciclo Center', '22.456.789/0001-44', '5555-4444', 'Rua das Rodas, 99', 'senha5678', 'ciclo@center.com');

INSERT INTO TipoServico (nome_tipo, descricao, lojista_id) VALUES
('Revisão Completa', 'Inclui revisão de freios, transmissão e suspensão',1),
('Ajuste de Freios', 'Ajuste dos freios para melhorar a eficiência de frenagem',1),
('Troca de Pneus', 'Substituição dos pneus desgastados',2),
('Limpeza e Lubrificação', 'Limpeza e lubrificação dos componentes da bicicleta',3),
('Ajuste de Câmbio', 'Ajuste fino do câmbio traseiro e dianteiro',3);
UPDATE TipoServico SET preco = 200 WHERE lojista_id = 1;


INSERT INTO AlertaManutencao (tipo, data, horario, quilometragem, ultima_manutencao, quilometragem_atual, quilometragem_maxima, horas_maximas, dias_maximos, id_bicicleta, id_usuario) VALUES
('Troca de Pneus', '2024-02-28', '09:00:00', 1500, '2023-11-01', 1400, 1500, 200, 180, 1, 1),
('Ajuste de Suspensão', '2024-03-10', '08:00:00', 800, '2023-12-10', 750, 800, 50, 45, 2, 2),
('Limpeza Completa', '2024-04-05', '11:00:00', 2000, '2023-10-05', 1950, 2000, 60, 90, 3, 3),
('Troca de Corrente', '2024-05-15', '14:00:00', 1200, '2023-09-15', 1150, 1200, 100, 120, 4, 4),
('Revisão Geral', '2024-06-20', '13:00:00', 1600, '2023-08-20', 1500, 1600, 150, 180, 5, 5);

INSERT INTO Servicos ( preco, data_servico, status, id_bicicleta, id_lojista, id_tipo_servico) 
VALUES
( 150.00, '2024-01-20', 'Pendente', 1, 1, 1),
( 100.00, '2024-02-10', 'Concluído', 2, 1, 2),
( 120.00, '2024-02-15', 'Pendente', 3, 2, 3),
( 75.00, '2024-02-20', 'Concluído', 4, 3, 4),
( 50.00, '2024-03-01', 'Pendente', 5, 3, 5);

INSERT INTO OrdemServico 
(data, valor, forma_pagamento, observacoes, status_pagamento, id_bicicleta, id_lojista, id_usuario, id_tipo_servico) 
VALUES
('2024-01-21', 150.00, 'Cartão de Crédito', 'Sem observações', 'Pendente', 1, 1, 1, 1),
('2024-02-10', 100.00, 'Cartão de Crédito', 'Urgente para corrida', 'Pago', 2, 1, 2, 2),
('2024-02-15', 120.00, 'Dinheiro', 'Revisão para viagem', 'Pendente', 3, 2, 3, 3),
('2024-02-20', 75.00, 'Cartão de Débito', 'Necessidade de lubrificação', 'Pago', 4, 3, 4, 4),
('2024-03-01', 50.00, 'Pix', 'Câmbio ajustado', 'Pago', 5, 4, 5, 5);



-- Inserindo dados na tabela Feedback
INSERT INTO Feedback (avaliacao, comentario, data, id_ordem_servico, id_servico, id_usuario) VALUES
(5, 'Excelente troca de freios, serviço rápido e eficiente.', '2024-02-10', 2, 2, 2),
(4, 'Revisão completa, mas atrasou na entrega.', '2024-02-15', 3, 3, 3),
(3, 'Ajuste de câmbio ok, mas poderia ser mais rápido.', '2024-02-20', 4, 4, 4),
(5, 'Serviço impecável, bicicleta como nova.', '2024-01-21', 1, 1, 1),
(4, 'Bom serviço, preço razoável.', '2024-03-01', 5, 5, 5);

-- Inserindo dados na tabela Historico
INSERT INTO Historico (descricao, data_registro, id_bicicleta, id_servico) VALUES
('Revisão completa realizada', '2024-01-21', 1, 1),
('Troca de freios a disco', '2024-02-10', 2, 2),
('Substituição de pneus', '2024-02-15', 3, 3),
('Limpeza e lubrificação finalizadas', '2024-02-20', 4, 4),
('Ajuste de câmbio realizado', '2024-03-01', 5, 5);

-- Inserindo dados na tabela Chat
INSERT INTO Chat (mensagem, data_envio, id_usuario, id_lojista) VALUES
('Oi, posso levar a bicicleta hoje para revisão?', '2024-02-09', 1, 1),
('Sim, estamos disponíveis a partir das 9h.', '2024-02-09', 1, 1),
('O câmbio da minha bicicleta está com problemas, posso levar amanhã?', '2024-02-19', 3, 4),
('Gostaria de agendar uma troca de pneus, é possível?', '2024-03-05', 2, 3),
('Pode trazer a bicicleta para revisão geral hoje à tarde?', '2024-04-10', 4, 2);

-- Inserindo dados na tabela Relatorios
INSERT INTO Relatorios (tipo, data_geracao, conteudo, id_lojista) VALUES
('Financeiro', '2024-02-28', 'Relatório de vendas e serviços de fevereiro.', 1),
('Operacional', '2024-03-01', 'Desempenho de revisões e ajustes de março.', 2),
('Estoque', '2024-03-15', 'Relatório do estoque de peças e componentes.', 3),
('Clientes', '2024-04-01', 'Relatório detalhado de clientes e serviços realizados.', 4),
('Serviços Concluídos', '2024-04-10', 'Relatório de serviços finalizados em abril.', 5);

-- Inserindo dados na tabela RelatorioCliente
INSERT INTO RelatorioCliente (id_usuario, id_ordem_servico, conteudo, formato) VALUES
(1, 1, 'Relatório detalhado da revisão completa realizada.', 'PDF'),
(2, 2, 'Relatório da troca de freios efetuada.', 'PDF'),
(3, 3, 'Relatório de substituição de pneus.', 'HTML'),
(4, 4, 'Relatório de limpeza e lubrificação.', 'PDF'),
(5, 5, 'Relatório de ajuste de câmbio.', 'PDF');

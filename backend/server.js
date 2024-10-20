// Importa as dependências
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Para interpretar o JSON
const cors = require('cors'); // Importa o cors

// Cria a instância do Express
const app = express();

// Middleware para permitir CORS
app.use(cors()); // Agora está na posição correta

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'BikeSync',
});

// Conecta ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para adicionar uma bicicleta
app.post('/bicicletas', (req, res) => {
  const { marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario } = req.body;
  
  const sql = 'INSERT INTO Bicicleta (marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  // Usa 'connection' ao invés de 'db'
  connection.query(sql, [marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Bicicleta adicionada com sucesso!', bicicletaId: result.insertId });
  });
});

// Define a porta e inicia o servidor
const port = 3000; // Verifique se esta é a porta que você deseja usar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

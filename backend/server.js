
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



// Importa o bcrypt
const bcrypt = require('bcrypt');

// Rota para login
app.post('/login', (req, res) => {
  const { email, senha, tipoLogin } = req.body;

  let sql = '';
  let queryParams = [email]; // Parâmetro inicial será o email

  // Define a query com base no tipo de login (usuario ou lojista)
  if (tipoLogin === 'usuario') {
    sql = 'SELECT * FROM Usuario WHERE email = ? AND status = TRUE'; // Status TRUE indica que o usuário não foi excluído logicamente
  } else if (tipoLogin === 'lojista') {
    sql = 'SELECT * FROM Lojista WHERE email = ?';
  } else {
    return res.status(400).send({ success: false, message: 'Tipo de login inválido.' });
  }

  if (!email || !senha) {
    return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });
  }
  connection.query(sql, queryParams, (err, result) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Erro no servidor.' });
    }

    if (result.length > 0) {
      const user = result[0];

      // Aqui usamos o bcrypt para comparar a senha enviada com a senha hash armazenada
      bcrypt.compare(senha, user.senha, (err, match) => {
        if (err) {
          return res.status(500).send({ success: false, message: 'Erro ao verificar a senha.' });
        }

        if (match) {
          // Se as senhas coincidirem, o login é bem-sucedido
          res.status(200).send({
            success: true,
            message: 'Login bem-sucedido!',
            user: {
              nome: user.nome, // Aqui está o nome do usuário
            },
          });
        } else {
          // Se a senha não coincidir, retorna erro de senha incorreta
          res.status(401).send({ success: false, message: 'Senha incorreta.' });
        }
      });
    } else {
      res.status(404).send({ success: false, message: 'Usuário não encontrado.' });
    }
  });
   
  });


// Define a porta e inicia o servidor
const port = 3000; // Verifique se esta é a porta que você deseja usar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


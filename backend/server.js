const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const bcrypt = require('bcrypt'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuração de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'BikeSync',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Endpoint para adicionar bicicleta com id_marca
app.post('/bicicletas', (req, res) => {
  const { id_marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario } = req.body;

  const sql = 'INSERT INTO Bicicleta (id_marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(sql, [id_marca, modelo, ano, tamanho_roda, serial, tipo, cor, material, kit_transmissao, tamanho_quadro, informacoes_adicionais, id_usuario], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar bicicleta:', err); // Log do erro
      return res.status(500).send({ message: 'Erro ao adicionar bicicleta', error: err });
    }
    res.status(200).send({ message: 'Bicicleta adicionada com sucesso!', bicicletaId: result.insertId });
  });
});

// Rota para obter todas as marcas
app.get('/marcas', (req, res) => {
  const sql = 'SELECT * FROM Marca'; 
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get('/api/lojas', (req, res) => {
  const sql = 'SELECT * FROM Lojista'; 
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Rota para obter todas as bicicletas (com JOIN para exibir nome da marca)
app.get('/api/bicicletas', (req, res) => {
  const sql = `SELECT b.id_bicicleta, m.nome_marca AS marca, b.modelo, b.ano, b.tamanho_roda, b.serial, b.tipo, b.cor, b.material, b.kit_transmissao, b.tamanho_quadro, b.informacoes_adicionais, b.id_usuario 
               FROM Bicicleta b 
               JOIN Marca m ON b.id_marca = m.id_marca`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Rota para obter bicicletas de um usuário específico
app.get('/api/bicicletas/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;

  const sql = `SELECT b.id_bicicleta, m.nome_marca AS marca, b.modelo, b.ano, b.tamanho_roda, b.serial, b.tipo, b.cor, b.material, b.kit_transmissao, b.tamanho_quadro, b.informacoes_adicionais 
               FROM Bicicleta b 
               JOIN Marca m ON b.id_marca = m.id_marca 
               WHERE b.id_usuario = ?`;

  connection.query(sql, [id_usuario], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Rota para login
app.post('/login', (req, res) => {
  const { email, senha, tipoLogin } = req.body;

  let sql = '';
  let queryParams = [email]; 
  
  if (tipoLogin === 'usuario') {
    sql = 'SELECT * FROM Usuario WHERE email = ? AND status = TRUE'; 
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

      bcrypt.compare(senha, user.senha, (err, match) => {
        if (err) {
          return res.status(500).send({ success: false, message: 'Erro ao verificar a senha.' });
        }

        if (match) {
          res.status(200).send({
            success: true,
            message: 'Login bem-sucedido!',
            user: {
              nome: user.nome, 
              id_usuario: user.id_usuario,
              id_lojista: user.id_lojista
            },
          });
        } else {
          res.status(401).send({ success: false, message: 'Senha incorreta.' });
        }
      });
    } else {
      res.status(404).send({ success: false, message: 'Usuário não encontrado.' });
    }
  });
});

// Rota para deletar uma bicicleta
app.delete('/bicicletas/:id_bicicleta', (req, res) => {
  const { id_bicicleta } = req.params;

  const sql = 'DELETE FROM Bicicleta WHERE id_bicicleta = ?';
  connection.query(sql, [id_bicicleta], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao deletar bicicleta', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Bicicleta não encontrada' });
    }
    res.status(200).send({ message: 'Bicicleta deletada com sucesso!' });
  });
});

// Endpoint para obter histórico
app.get('/historico/:idLojista', (req, res) => {
  const { idLojista } = req.params;
  const { data, tipoFiltro } = req.query;  // Recebe a data e o tipo de filtro

  // Inicia a consulta SQL base
  let query = `
     SELECT Historico.descricao, Historico.data_registro, Bicicleta.modelo, Servicos.tipo, Usuario.nome, Usuario.email, Usuario.telefone
     FROM Historico
     INNER JOIN Servicos ON Historico.id_servico = Servicos.id_servico
     INNER JOIN Bicicleta ON Historico.id_bicicleta = Bicicleta.id_bicicleta
     INNER JOIN Usuario ON Bicicleta.id_usuario = Usuario.id_usuario
     WHERE Servicos.id_lojista = ?
  `;
  
  // Adiciona o filtro de data, dependendo do tipo de filtro
  if (data) {
    if (tipoFiltro === 'ate') {
      query += ` AND DATE(Historico.data_registro) <= ?`;  // Registros até a data selecionada
    } else if (tipoFiltro === 'antes') {
      query += ` AND DATE(Historico.data_registro) < ?`;  // Registros antes da data selecionada
    }
  }

  query += ` ORDER BY Historico.data_registro DESC;`;

  // Usando a conexão correta para executar a consulta
  connection.query(query, [idLojista, data], (err, results) => {
    if (err) {
      console.error("Erro ao buscar o histórico:", err);
      return res.status(500).send("Erro ao buscar o histórico");
    }
    res.json(results);
  });
});


const port = 3000; 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

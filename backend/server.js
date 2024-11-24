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

// Endpoint para listar serviços de um lojista específico
app.get('/api/lojistas/:id_lojista/servicos', (req, res) => {
  const { id_lojista } = req.params;
  const sql = `
    SELECT Servicos.id_servico, Servicos.tipo, Servicos.descricao_servico, Servicos.preco, Servicos.data_servico, Servicos.status
    FROM Servicos
    WHERE Servicos.id_lojista = ?`;
  
  connection.query(sql, [id_lojista], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao carregar serviços.');
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

// Rota para histórico de usuário
app.get('/historico/usuario/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  
  // Sua consulta SQL para o histórico do usuário
  let query = `
    SELECT 
      h.id_historico, 
      h.descricao, 
      h.data_registro, 
      b.modelo,
      m.nome_marca,
      h.id_servico,
      s.tipo, 
      s.preco,
      l.nome_loja
    FROM Historico h
    INNER JOIN Bicicleta b ON h.id_bicicleta = b.id_bicicleta
    INNER JOIN Marca m ON b.id_marca = m.id_marca
    LEFT JOIN Servicos s ON h.id_servico = s.id_servico
    INNER JOIN Lojista l ON s.id_lojista = l.id_lojista
    WHERE b.id_usuario = ?
    ORDER BY h.data_registro DESC;
  `;
  
  connection.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error("Erro ao buscar o histórico:", err);
      return res.status(500).send("Erro ao buscar o histórico");
    }
    res.json(results);
  });
});
// Rota para adicionar serviço para o lojista com preço
app.post('/servicos/lojista/:id_lojista', (req, res) => {
  const { id_lojista } = req.params;
  const { nome_tipo, descricao, preco } = req.body;  // Alterado tipo_servico para nome_tipo

  if (!nome_tipo || !descricao || !preco || preco <= 0) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios e o preço deve ser válido.' });
  }

  const sql = 'INSERT INTO TipoServico (lojista_id, nome_tipo, descricao, preco) VALUES (?, ?, ?, ?)';  // Alterado tipo_servico para nome_tipo
  connection.query(sql, [id_lojista, nome_tipo, descricao, preco], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar serviço:", err);
      return res.status(500).send({ message: 'Erro ao adicionar serviço', error: err });
    }
    res.status(200).send({
      message: 'Serviço adicionado com sucesso!',
      servico: { id_servico: result.insertId, nome_tipo, descricao, preco }  // Alterado tipo_servico para nome_tipo
    });
  });
});

// Rota para adicionar serviço para o lojista com preço
app.post('/servicos/lojista/:id_lojista', (req, res) => {
  const { id_lojista } = req.params;
  const { nome_tipo, descricao, preco } = req.body;  // Alterado tipo_servico para nome_tipo

  if (!nome_tipo || !descricao || !preco || preco <= 0) {
    return res.status(400).send({ message: 'Todos os campos são obrigatórios e o preço deve ser válido.' });
  }

  const sql = 'INSERT INTO TipoServico (lojista_id, nome_tipo, descricao, preco) VALUES (?, ?, ?, ?)';  // Alterado tipo_servico para nome_tipo
  connection.query(sql, [id_lojista, nome_tipo, descricao, preco], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar serviço:", err);
      return res.status(500).send({ message: 'Erro ao adicionar serviço', error: err });
    }
    res.status(200).send({
      message: 'Serviço adicionado com sucesso!',
      servico: { id_servico: result.insertId, nome_tipo, descricao, preco }  // Alterado tipo_servico para nome_tipo
    });
  });
});


// Rota para remover serviço
app.delete('/servicos/:id_servico', (req, res) => {
  const { id_servico } = req.params;

  // Query para excluir o serviço pelo id
  const sql = 'DELETE FROM TipoServico WHERE id_servico = ?';  // Alterado para refletir a tabela TipoServico
  connection.query(sql, [id_servico], (err, result) => {
    if (err) {
      console.error("Erro ao remover serviço:", err);
      return res.status(500).send({ message: 'Erro ao remover serviço', error: err });
    }
    res.status(200).send({ message: 'Serviço removido com sucesso!' });
  });
});


// Rota para histórico de lojista
app.get('/historico/lojista/:idLojista', (req, res) => {
  const { idLojista } = req.params;
  const { data, tipoFiltro } = req.query;

  // Sua consulta SQL para o histórico do lojista
  let query = `
     SELECT Historico.descricao, Historico.data_registro, Bicicleta.modelo, Servicos.tipo, Usuario.nome, Usuario.email, Usuario.telefone, Servicos.descricao_servico
     FROM Historico
     INNER JOIN Servicos ON Historico.id_servico = Servicos.id_servico
     INNER JOIN Bicicleta ON Historico.id_bicicleta = Bicicleta.id_bicicleta
     INNER JOIN Usuario ON Bicicleta.id_usuario = Usuario.id_usuario
     WHERE Servicos.id_lojista = ?
  `;
  
  const queryParams = [idLojista];
  
  if (data) {
    if (tipoFiltro === 'ate') {
      query += ` AND Historico.data_registro <= ?`;
      queryParams.push(data);
    } else if (tipoFiltro === 'antes') {
      query += ` AND Historico.data_registro < ?`;
      queryParams.push(data);
    }
  }

  query += ` ORDER BY Historico.data_registro DESC;`;

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Erro ao buscar o histórico:", err);
      return res.status(500).send("Erro ao buscar o histórico");
    }
    res.json(results);
  });
});

app.get('/relatorios/:id_lojista', async (req, res) => {
  const { id_lojista } = req.params;
  try {
    const result = await new Promise((resolve, reject) => {
      connection.query(`
        SELECT tipo AS name, COUNT(*) AS quantidade 
        FROM Servicos 
        WHERE id_lojista = ? 
        GROUP BY tipo
      `, [id_lojista], (err, results) => {
        if (err) {
          reject(err);  // Rejeita a Promise se houver erro
        } else {
          resolve(results);  // Resolve com os resultados
        }
      });
    });

    // Calculando o total de serviços
    const totalServicos = result.reduce((acc, curr) => acc + curr.quantidade, 0);

    // Enviando os dados do relatório e o total de serviços
    res.json({
      data: result,
      totalServicos,  // Incluindo o total de serviços no retorno
    });
  } catch (error) {
    console.error('Erro ao carregar dados do relatório:', error);
    res.status(500).json({ error: 'Erro ao carregar dados do relatório' });
  }
});


// Rota para obter o valor total dos serviços prestados por um lojista
app.get('/valorTotalServicos/:id_lojista', (req, res) => {
  const { id_lojista } = req.params;
  
  const query = `
    SELECT SUM(preco) AS valorTotal 
    FROM Servicos 
    WHERE id_lojista = ?
  `;
  
  connection.query(query, [id_lojista], (err, results) => {
    if (err) {
      console.error('Erro ao calcular o valor total dos serviços:', err);
      return res.status(500).send({ error: 'Erro ao calcular o valor total dos serviços' });
    }
    res.json({
      valorTotal: results[0].valorTotal || 0, // Retorna 0 se o valor total for nulo
    });
  });
});




const port = 3000; 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

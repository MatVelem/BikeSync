// updatePassword.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'BikeSync',
});

// Função para atualizar a senha
const updatePassword = async () => {
  const senhaAntiga = 'senha123'; // Senha original que foi armazenada
  const hash = await bcrypt.hash(senhaAntiga, 10); // Hash a senha com um custo de 10

  const sql = 'UPDATE Usuario SET senha = ? WHERE email = ?';
  connection.query(sql, [hash, 'joao.silva@example.com'], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar a senha:', err);
    } else {
      console.log('Senha atualizada com sucesso!');
    }

    // Feche a conexão após a operação
    connection.end();
  });
};

// Chame a função para executar a atualização
updatePassword();

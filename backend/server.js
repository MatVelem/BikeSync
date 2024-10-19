const mysql = require('mysql2');

// Criando a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',   // Pode ser 'localhost' ou o endereço do servidor MySQL
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: 'admin', // Substitua pela sua senha do MySQL
  database: 'BikeSync' // O nome do banco de dados que você criou
});

// Testando a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;

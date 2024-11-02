import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = 'http://localhost:3000';

  const fetchHistorico = async () => {
    try {
      const response = await axios.get('/historico');
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setHistorico(response.data);
      } else {
        setError('Formato de dados inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      setError('Erro ao carregar histórico. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <div>
      <h1>Histórico de Serviços</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>ID</th>
            <th style={{ border: '1px solid black' }}>Descrição</th>
            <th style={{ border: '1px solid black' }}>Data do Registro</th>
            <th style={{ border: '1px solid black' }}>ID da Bicicleta</th>
            <th style={{ border: '1px solid black' }}>ID do Serviço</th>
            <th style={{ border: '1px solid black' }}>Tipo do Serviço</th>
            <th style={{ border: '1px solid black' }}>Preço</th>
          </tr>
        </thead>
        <tbody>
          {historico.length > 0 ? (
            historico.map((item) => (
              <tr key={item.id_historico}>
                <td style={{ border: '1px solid black' }}>{item.id_historico}</td>
                <td style={{ border: '1px solid black' }}>{item.descricao}</td>
                <td style={{ border: '1px solid black' }}>{item.data_registro}</td>
                <td style={{ border: '1px solid black' }}>{item.id_bicicleta}</td>
                <td style={{ border: '1px solid black' }}>{item.id_servico}</td>
                <td style={{ border: '1px solid black' }}>{item.tipo || 'N/A'}</td>
                <td style={{ border: '1px solid black' }}>{item.preco || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', border: '1px solid black' }}>
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

<script src="/AppEntry.bundle?platform=web&dev=true" defer></script>

export default Historico;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const ServicosScreen = ({ route }) => {
  const { id_bicicleta } = route.params; // Recebe o id_bicicleta passado da tela anterior
  const [bicicleta, setBicicleta] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Busca os detalhes da bicicleta com o id_bicicleta
    fetch(`http://localhost:3000/api/bicicletas/${id_bicicleta}`)
      .then((response) => response.json())
      .then((data) => setBicicleta(data))
      .catch((error) => {
        console.log('Erro ao carregar detalhes da bicicleta:', error);
        setError('Erro ao carregar detalhes da bicicleta.');
      });

    // Busca os serviços disponíveis
    fetch('http://localhost:3000/servicos')
      .then((response) => response.json())
      .then((data) => {
        console.log('Serviços recebidos:', data);  // Log para verificar a resposta
        setServicos(data);
      })
      .catch((error) => {
        console.log('Erro ao carregar serviços:', error);
        setError('Erro ao carregar serviços.');
      });
  }, [id_bicicleta]);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {bicicleta ? (
        <>
          <Text style={styles.title}>Serviços para {bicicleta.modelo}</Text>
          <FlatList
            data={servicos}
            keyExtractor={(item) => item.id_servico.toString()}
            renderItem={({ item }) => (
              <View style={styles.servicoItem}>
                <Text style={styles.servicoTipo}>{item.nome_tipo}</Text> {/* Exibe o tipo do serviço */}
                <Text style={styles.servicoDescricao}>{item.descricao}</Text> {/* Exibe a descrição do serviço */}
                <Button title="Agendar Serviço" onPress={() => alert('Serviço agendado')} />
              </View>
            )}
          />
        </>
      ) : (
        <Text>Carregando informações...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  servicoItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  servicoTipo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicoDescricao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  servicoPreco: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ServicosScreen;

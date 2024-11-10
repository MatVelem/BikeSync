import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';

const Historico = ({ navigation }) => {
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = 'http://localhost:3000';

  const fetchHistorico = async () => {
    try {
      const response = await axios.get('/historico');
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/bikesyncimagem.png')} style={styles.logo} />
        <View style={styles.icons}>
          <Image source={{ uri: '../assets/usuario.png' }} style={styles.icon} />
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Histórico de Serviços</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={historico}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>ID: {item.id_historico}</Text>
            <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
            <Text style={styles.itemText}>Data: {item.data_registro}</Text>
            <Text style={styles.itemText}>Preço: {item.preco || 'N/A'}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id_historico.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Agendar', { id_lojista: 1 })} // Altere para o ID do lojista
      >
        <Text style={styles.buttonText}>AGENDAR NOVO SERVIÇO</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Historico;

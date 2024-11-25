import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const EscolherBicicletaScreen = ({ navigation, route }) => {
  const { id_usuario, id_servico } = route.params || {};
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id_usuario) {
      axios
        .get(`http://localhost:3000/api/bicicletas/${id_usuario}`)
        .then((response) => {
          setBicicletas(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao carregar bicicletas:', error);
          setLoading(false);
        });
    } else {
      console.error('ID de usuário não encontrado');
      setLoading(false);
    }
  }, [id_usuario]);

  const selecionarBicicleta = (bicicleta) => {
    navigation.navigate('LojasScreen', {
      id_usuario,
      id_bicicleta: bicicleta.id_bicicleta,
      id_servico,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Carregando bicicletas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Escolha uma Bicicleta</Text>

      <FlatList
        data={bicicletas}
        keyExtractor={(item) => item.id_bicicleta.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => selecionarBicicleta(item)}
          >
            <Text style={styles.buttonText}>{item.modelo}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma bicicleta disponível.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFB400',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EscolherBicicletaScreen;

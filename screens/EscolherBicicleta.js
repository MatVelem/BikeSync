import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

const EscolherBicicletaScreen = ({ navigation, route }) => {
  const { id_usuario } = route.params || {}; // Obtém o id_usuario da navegação
  const [bicicletas, setBicicletas] = useState([]); // Estado para armazenar as bicicletas
  const [loading, setLoading] = useState(true); // Estado para controlar o loading

  // Faz a requisição para o servidor buscando as bicicletas do usuário
  useEffect(() => {
    if (id_usuario) {
      fetch(`http://localhost:3000/api/bicicletas/${id_usuario}`)
        .then((response) => response.json())
        .then((data) => {
          setBicicletas(data);
          setLoading(false); // Finaliza o loading
        })
        .catch((error) => {
          console.error('Erro ao carregar bicicletas:', error);
          setLoading(false); // Finaliza o loading mesmo em caso de erro
        });
    }
  }, [id_usuario]);

  // Função para selecionar a bicicleta
  const selecionarBicicleta = (bicicleta) => {
    navigation.navigate('Servicos', {
      id_usuario,
      id_bicicleta: bicicleta.id_bicicleta,
    });
  };

  // Exibe um carregamento enquanto as bicicletas são carregadas
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.title}>Carregando bicicletas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Bicicleta</Text>

      {/* Lista de bicicletas */}
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
      />
    </View>
  );
};

// Estilos para a tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default EscolherBicicletaScreen;

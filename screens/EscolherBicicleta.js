import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Importa o axios

const EscolherBicicletaScreen = ({ navigation, route }) => {
  const { id_usuario, id_servico } = route.params || {}; // Obtém o id_usuario e id_servico da navegação
  const [bicicletas, setBicicletas] = useState([]); // Estado para armazenar as bicicletas
  const [loading, setLoading] = useState(true); // Estado para controlar o loading

  // Verifica se id_usuario está disponível antes de fazer a requisição
  useEffect(() => {
    if (id_usuario) {
      axios
        .get(`http://localhost:3000/api/bicicletas/${id_usuario}`)
        .then((response) => {
          setBicicletas(response.data); // Atualiza o estado com os dados das bicicletas
          setLoading(false); // Finaliza o loading
        })
        .catch((error) => {
          console.error('Erro ao carregar bicicletas:', error);
          setLoading(false); // Finaliza o loading mesmo em caso de erro
        });
    } else {
      console.error('ID de usuário não encontrado');
      setLoading(false); // Finaliza o loading se id_usuario não for passado
    }
  }, [id_usuario]); // Re-executa o useEffect apenas quando id_usuario mudar

  // Função para selecionar a bicicleta e navegar para a tela de confirmação ou ação do serviço
  const selecionarBicicleta = (bicicleta) => {
    // Navegar para a próxima tela passando tanto o id_bicicleta quanto o id_servico
    navigation.navigate('LojasScreen', {
      id_usuario,
      id_bicicleta: bicicleta.id_bicicleta,
      id_servico, // Passando o id_servico para a próxima tela
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
            onPress={() => selecionarBicicleta(item)} // Passa a bicicleta selecionada
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

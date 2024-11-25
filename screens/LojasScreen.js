import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LojasScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id_usuario } = route.params || {}; // Receber id_usuario nas props
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoja, setSelectedLoja] = useState(null);
  const [tiposServicos, setTiposServicos] = useState([]);

  useEffect(() => {
    const fetchLojas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/lojas');
        setLojas(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLojas();
  }, []);

  const fetchTiposServicos = async (id_lojista) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/lojistas/${id_lojista}/servicos`);
      setTiposServicos(response.data);
    } catch (err) {
      setError('Erro ao carregar os tipos de serviços');
    }
  };

  const handleSelectServico = (id_tipo_servico, id_lojista) => {
   
    navigation.navigate('EscolherBicicleta', { id_usuario, id_lojista, id_tipo_servico });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedLoja(item);
        fetchTiposServicos(item.id_lojista);
      }}
    >
      <Text style={styles.itemText}>Nome: {item.nome_loja}</Text>
    </TouchableOpacity>
  );

  const renderTipoServico = ({ item }) => (
    <View style={styles.servicoItem}>
      <Text style={styles.servicoText}>Tipo: {item.nome_tipo}</Text>
      <Text style={styles.servicoText}>Descrição: {item.descricao}</Text>
      <Text style={styles.servicoText}>Preço: R$ {item.preco}</Text>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectServico(item.id_tipo_servico, selectedLoja.id_lojista)}
      >
        <Text style={styles.selectButtonText}>Selecionar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Erro: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lojas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_lojista.toString()}
      />

      {selectedLoja && tiposServicos.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Tipos de serviços da loja {selectedLoja.nome_loja}:</Text>
          <FlatList
            data={tiposServicos}
            renderItem={renderTipoServico}
            keyExtractor={(item) => item.id_tipo_servico.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  servicoItem: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  servicoText: {
    fontSize: 16,
    color: '#000',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LojasScreen;

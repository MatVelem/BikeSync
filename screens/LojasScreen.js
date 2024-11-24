import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LojasScreen = () => {
  const navigation = useNavigation(); // Para navegação
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoja, setSelectedLoja] = useState(null);
  const [servicos, setServicos] = useState([]);
 

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

  const fetchServicos = async (id_lojista) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/lojistas/${id_lojista}/servicos`);
      setServicos(response.data);
    } catch (err) {
      setError('Erro ao carregar os serviços');
    }
  };

  const handleSelectServico = (id_servico, id_usuario) => {
    // Navegar para a tela 'EscolherBicicleta' passando o id_servico e id_usuario
    navigation.navigate('EscolherBicicleta', { id_servico, id_usuario: 1});
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedLoja(item);
        fetchServicos(item.id_lojista); // Busca os serviços ao selecionar a loja
      }}
    >
      <Text style={styles.itemText}>Nome: {item.nome_loja}</Text>
    </TouchableOpacity>
  );

  const renderServico = ({ item }) => (
    <View style={styles.servicoItem}>
      <Text style={styles.servicoText}>Tipo: {item.tipo}</Text>
      <Text style={styles.servicoText}>Descrição: {item.descricao_servico}</Text>
      <Text style={styles.servicoText}>Preço: R$ {item.preco}</Text>
      

      {/* Botão para selecionar o serviço */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectServico(item.id_servico)}
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
      
      {selectedLoja && servicos.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Serviços da loja {selectedLoja.nome_loja}:</Text>
          <FlatList
            data={servicos}
            renderItem={renderServico}
            keyExtractor={(item) => item.id_servico.toString()}
          />
        </View>
      )}
    </View>
  );
};

// Estilos atualizados
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

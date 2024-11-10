import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';



const HistoricoServicosLojista = ({ route }) => {
  const { id_lojista } = route.params;
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch(`http://localhost:3000/historico/${id_lojista}`);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [id_lojista]);

  useEffect(() => {
    console.log("ID do lojista na tela de histórico:", id_lojista); // Verifica se o id_lojista está correto
  }, [id_lojista]);

  const renderHistoricoItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
      <Text style={styles.itemText}>Data: {new Date(item.data_registro).toLocaleDateString()}</Text>
      <Text style={styles.itemText}>Bicicleta: {item.modelo}</Text>
      <Text style={styles.itemText}>Serviço: {item.tipo}</Text>
      <Text style={styles.itemNumber}>Valor: {item.preco}</Text>
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Serviços</Text>
      <FlatList
        data={historico}
        renderItem={renderHistoricoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HistoricoServicosLojista;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Lojas = () => {
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Nome: {item.nome_loja}</Text>
      <Text style={styles.itemText}>CNPJ: {item.cnpj}</Text>
      <Text style={styles.itemText}>Telefone: {item.telefone}</Text>
      <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
      <Text style={styles.itemText}>Email: {item.email}</Text>
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
    </View>
  );
};

// Definição dos estilos
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
});

export default Lojas;

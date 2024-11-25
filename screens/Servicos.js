import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ServicosScreen = ({ route }) => {
  const { idLoja } = route.params;
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/lojistas/${idLoja}/servicos`) // Ajustei a rota aqui
      .then((response) => response.json())
      .then((data) => setServicos(data))
      .catch((error) => console.error('Erro ao carregar serviços:', error));
  }, [idLoja]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços da Loja</Text>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id_tipo_servico.toString()} // Ajustei o keyExtractor para id_tipo_servico
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.nome_tipo}</Text> // Ajustei para item.nome_tipo
            <Text style={styles.description}>{item.descricao}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 5 },
  text: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#555' },
});

export default ServicosScreen;

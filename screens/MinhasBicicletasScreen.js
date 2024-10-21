import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MinhasBicicletasScreen = ({ route }) => {
  const { id_usuario } = route.params || {}; // Protege contra erro caso params seja undefined
  const [bicicletas, setBicicletas] = useState([]);

  useEffect(() => {
    const fetchBicicletas = async () => {
      if (id_usuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/bicletas/${id_usuario}`);
          const data = await response.json();
          setBicicletas(data);
        } catch (error) {
          console.error('Erro ao buscar bicicletas:', error);
        }
      }
    };

    fetchBicicletas();
  }, [id_usuario]);

  if (!id_usuario) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Minhas Bicicletas</Text>
      <FlatList
        data={bicicletas}
        keyExtractor={(item) => item.id_bicicleta.toString()}
        renderItem={({ item }) => (
          <View style={styles.bicicletaContainer}>
            <Text>Marca: {item.marca}</Text>
            <Text>Modelo: {item.modelo}</Text>
            <Text>Ano: {item.ano}</Text>
            <Text>Cor: {item.cor}</Text>
            <Text>Material: {item.material}</Text>
            <Text>Kit de Transmissão: {item.kit_transmissao}</Text>
            <Text>Tamanho do Quadro: {item.tamanho_quadro}</Text>
            <Text>Informações Adicionais: {item.informacoes_adicionais}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bicicletaContainer: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default MinhasBicicletasScreen;

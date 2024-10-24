import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';

const MinhasBicicletasScreen = ({ route }) => {
  const { id_usuario } = route.params || {}; // Protege contra erro caso params seja undefined
  const [bicicletas, setBicicletas] = useState([]);

  useEffect(() => {
    const fetchBicicletas = async () => {
      if (id_usuario) {
        try {
          const response = await fetch(`http://localhost:3000/api/bicicletas/${id_usuario}`);
          const data = await response.json();
          setBicicletas(data);
        } catch (error) {
          console.error('Erro ao buscar bicicletas:', error);
        }
      }
    };

    fetchBicicletas();
  }, [id_usuario]);

  // Função para excluir a bicicleta
  const handleDelete = async (id_bicicleta) => {
    try {
      const response = await fetch(`http://localhost:3000/bicicletas/${id_bicicleta}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove a bicicleta excluída da lista atualizada
        setBicicletas((prevBicicletas) =>
          prevBicicletas.filter((bicicleta) => bicicleta.id_bicicleta !== id_bicicleta)
        );
        Alert.alert('Sucesso', 'Bicicleta excluída com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a bicicleta.');
      }
    } catch (error) {
      console.error('Erro ao excluir bicicleta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a bicicleta.');
    }
  };

  if (!id_usuario) {
    return (
      <View style={styles.container}>
        <Text>Bicicleta Adicionada!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Bicicletas</Text>
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
            <Button
              title="Excluir Bicicleta"
              onPress={() => handleDelete(item.id_bicicleta)}
              color="red"
            />
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
    backgroundColor: '#FFB400', // Cor de fundo parecida com a imagem
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  bicicletaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bikeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  deleteIcon: {
    color: '#FF0000',
    fontSize: 20,
    marginRight: 10,
  },
  editIcon: {
    color: '#0000FF',
    fontSize: 20,
  },
  bikeInfo: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default MinhasBicicletasScreen;

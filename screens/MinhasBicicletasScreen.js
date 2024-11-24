import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, Modal } from 'react-native';

const MinhasBicicletasScreen = ({ route }) => {
  const { id_usuario } = route.params || {}; 
  const [bicicletas, setBicicletas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar o Modal
  const [bicicletaToDelete, setBicicletaToDelete] = useState(null); // Estado para armazenar a bicicleta que será excluída

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

  const handleDelete = async (id_bicicleta) => {
    try {
      const response = await fetch(`http://localhost:3000/bicicletas/${id_bicicleta}`, {
        method: 'DELETE',
      });

      if (response.ok) {
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

  const showDeleteConfirmation = (bicicleta) => {
    setBicicletaToDelete(bicicleta);
    setIsModalVisible(true); // Exibe o modal
  };

  const confirmDelete = () => {
    if (bicicletaToDelete) {
      handleDelete(bicicletaToDelete.id_bicicleta);
      setIsModalVisible(false); // Fecha o modal após a confirmação
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false); // Fecha o modal sem excluir
    setBicicletaToDelete(null); // Limpa a bicicleta selecionada para exclusão
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
              onPress={() => showDeleteConfirmation(item)}
              color="red"
            />
          </View>
        )}
      />

      {/* Modal de Confirmação */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja excluir a bicicleta {bicicletaToDelete?.modelo}?
            </Text>
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={cancelDelete} />
              <Button title="Excluir" onPress={confirmDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFB400',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default MinhasBicicletasScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import { Modal } from 'react-native';  // Importando Modal

const Historico = ({ navigation, route }) => {
  const { id_usuario } = route.params;  // Recebendo o id_usuario
  const [historico, setHistorico] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  axios.defaults.baseURL = 'http://localhost:3000';

  const fetchHistorico = async () => {
    try {
      const response = await axios.get(`/historico/${id_usuario}`);
      if (Array.isArray(response.data)) {
        setHistorico(response.data);
      } else {
        setError('Formato de dados inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      setError('Erro ao carregar histórico. Tente novamente mais tarde.');
    }
  };

  const openModal = (item) => {
    setSelectedService(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedService(null);
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/bikesyncimagem.png')} style={styles.logo} />
        <View style={styles.icons}>
          <Image source={{ uri: '../assets/usuario.png' }} style={styles.icon} />
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Histórico de Serviços</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={historico}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
            <Text style={styles.itemText}>Data: {item.data_registro}</Text>
            <Text style={styles.itemText}>Modelo: {item.modelo || 'N/A'}</Text>
            <Text style={styles.itemText}>Marca: {item.nome_marca || 'N/A'}</Text>
            <TouchableOpacity onPress={() => openModal(item)} style={styles.button}>
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id_historico.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal de Detalhes */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedService && (
              <>
                <Text style={styles.modalTitle}>Detalhes do Serviço</Text>
                <Text style={styles.modalText}>Descrição: {selectedService.descricao}</Text>
                <Text style={styles.modalText}>Data: {selectedService.data_registro}</Text>
                <Text style={styles.modalText}>Preço: {selectedService.preco || 'N/A'}</Text>
                <Text style={styles.modalText}>Modelo: {selectedService.modelo || 'N/A'}</Text>
                <Text style={styles.modalText}>Marca: {selectedService.nome_marca || 'N/A'}</Text>
                <TouchableOpacity onPress={closeModal} style={styles.buttonClose}>
                  <Text style={styles.buttonCloseText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonClose: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonCloseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Historico;
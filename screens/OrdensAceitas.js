import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert, Image, Modal, Picker } from 'react-native';

const OrdensAceitas = () => {
  const [servicosPendentes, setServicosPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    fetchServicosPendentes();
  }, []);

  const fetchServicosPendentes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/servicos/pendentes?id_lojista=1'); // Substitua o id_lojista conforme necessário
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao carregar os serviços pendentes');
      }
      setServicosPendentes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const alterarStatusServico = async (id_servico, status) => {
    setCurrentService({ id_servico, status });
    if (status === 'Concluído' || status === 'Cancelado') {
      setModalVisible(true);
    } else {
      await confirmarAlteracaoStatus();
    }
  };

  const confirmarAlteracaoStatus = async () => {
    setModalVisible(false);
    if (currentService) {
      const { id_servico, status } = currentService;
      try {
        console.log('ID do serviço:', id_servico, 'Novo status:', status);
        const response = await fetch('http://localhost:3000/api/servicos/alterar-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_servico, status }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Não foi possível alterar o status do serviço.');
        }
        Alert.alert('Sucesso', data.message);
        // Atualiza a lista de serviços pendentes após alterar o status
        fetchServicosPendentes();
      } catch (error) {
        console.error('Erro ao alterar status do serviço:', error);
        Alert.alert('Erro', error.message || 'Não foi possível alterar o status do serviço.');
      }
      setCurrentService(null);
    }
  };

  const cancelarAlteracaoStatus = () => {
    setModalVisible(false);
    setCurrentService(null); // Reverte para "Pendente" se o usuário cancelar
  };

  const renderPicker = (item) => {
    const backgroundColor = item.status === 'Pendente' ? '#FFB400' : item.status === 'Concluído' ? '#28a745' : '#dc3545';
    
    return (
      <Picker
        selectedValue={item.status}
        style={[styles.picker, { backgroundColor }]}
        onValueChange={(status) => alterarStatusServico(item.id_servico, status)}
      >
        <Picker.Item label="Pendente" value="Pendente" />
        <Picker.Item label="Concluído" value="Concluído" />
        <Picker.Item label="Cancelado" value="Cancelado" />
      </Picker>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={servicosPendentes}
        keyExtractor={(item) => item.id_servico.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}><Text style={styles.bold}>ID Serviço:</Text> {item.id_servico}</Text>
            <Text style={styles.cardText}><Text style={styles.bold}>Modelo Bicicleta:</Text> {item.modelo_bicicleta}</Text>
            <Text style={styles.cardText}><Text style={styles.bold}>Nome Lojista:</Text> {item.nome_lojista}</Text>
            <Text style={styles.cardText}><Text style={styles.bold}>Tipo Serviço:</Text> {item.tipo_servico}</Text>
            <Text style={styles.cardText}><Text style={styles.bold}>Preço:</Text> R$ {item.preco}</Text>
            <Text style={styles.cardText}><Text style={styles.bold}>Data do Serviço:</Text> {item.data_servico}</Text>
            <Text style={styles.statusLabel}>Alterar Status</Text>
            <View style={styles.pickerContainer}>
              {renderPicker(item)}
            </View>
          </View>
        )}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você tem certeza que deseja alterar o status para {currentService?.status}?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelarAlteracaoStatus}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmarAlteracaoStatus}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
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
    backgroundColor: '#FFB400',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // Adiciona sombra no Android
    shadowColor: '#000', // Adiciona sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  pickerContainer: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noOrders: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrdensAceitas;

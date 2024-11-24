import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, ActivityIndicator } from 'react-native';

const ServicosLojista = ({ navigation, route }) => {
  const { id_lojista } = route.params;
  const [servicos, setServicos] = useState([]);
  const [nomeTipo, setNomeTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar os serviços do lojista
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/servicos/lojista/${id_lojista}`);
        if (!response.ok) throw new Error('Erro ao buscar serviços');
        const data = await response.json();
        setServicos(data.services); // Atualiza o estado com os serviços do lojista
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchServicos();
  }, [id_lojista]);

  const handleAddService = async () => {
    if (!nomeTipo || !descricao || !preco || preco <= 0) {
      Alert.alert("Erro", "Por favor, insira um tipo de serviço, descrição e preço válido.");
      return;
    }

    const servico = {
      lojista_id: id_lojista,
      nome_tipo: nomeTipo,
      descricao: descricao,
      preco: parseFloat(preco),
    };

    try {
      const response = await fetch(`http://localhost:3000/servicos/lojista/${id_lojista}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servico),
      });

      if (!response.ok) throw new Error('Erro ao adicionar serviço');

      const data = await response.json();
      setServicos([...servicos, data.servico]); // Adiciona o novo serviço
      setPreco('');
      setDescricao('');
      setNomeTipo('');
      setModalVisible(false);
      Alert.alert('Serviço adicionado!', data.message);
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o serviço.');
    }
  };

  const handleRemoveService = async (idServico) => {
    try {
      const response = await fetch(`http://localhost:3000/servicos/${idServico}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao remover serviço');

      const data = await response.json();
      setServicos(servicos.filter(s => s.id_servico !== idServico)); // Remove o serviço da lista
      Alert.alert('Serviço removido!', data.message);
    } catch (error) {
      console.error('Erro ao remover serviço:', error);
      Alert.alert('Erro', 'Não foi possível remover o serviço.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços do Lojista</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View style={styles.servicesContainer}>
          {servicos.length > 0 ? (
            servicos.map((item) => (
              <View key={item.id_servico} style={styles.item}>
                <Text style={styles.itemText}>
                  {item.nome_tipo} - {item.descricao} | Preço: R$ {item.preco}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveService(item.id_servico)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noServiceText}>Sem serviços adicionados</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.addServiceButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addServiceButtonText}>Adicionar Serviço</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Novo Serviço</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Tipo de Serviço"
              value={nomeTipo}
              onChangeText={setNomeTipo}
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição do Serviço"
              value={descricao}
              onChangeText={setDescricao}
            />

            <TextInput
              style={styles.input}
              placeholder="Preço (R$)"
              value={preco}
              keyboardType="numeric"
              onChangeText={setPreco}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
              <Text style={styles.addButtonText}>Adicionar Serviço</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  removeButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addServiceButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addServiceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noServiceText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ServicosLojista;

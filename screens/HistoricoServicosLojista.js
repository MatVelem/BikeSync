import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, TextInput } from 'react-native';

const HistoricoServicosLojista = ({ route }) => {
  const { id_lojista } = route.params;
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(''); // Estado para armazenar a data do filtro
  const [filterTempDate, setFilterTempDate] = useState(''); // Estado temporário para armazenar o valor digitado
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    const fetchHistorico = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:3000/historico/${id_lojista}`;
        if (filterDate) {
          url += `?data=${filterDate}`; // Adiciona o filtro de data se estiver selecionado
        }
        const response = await fetch(url);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [id_lojista, filterDate]); // O filtro só é aplicado quando o filterDate é alterado

  const renderHistoricoItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
      <Text style={styles.itemText}>Data: {new Date(item.data_registro).toLocaleDateString()}</Text>
      <TouchableOpacity 
        style={styles.buttonDetails} 
        onPress={() => handleOpenModal(item)}
      >
        <Text style={styles.buttonDetailsText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleOpenFilterModal = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const handleApplyFilter = () => {
    setFiltering(true); // Indica que o filtro foi aplicado
    setFilterModalVisible(false); // Fecha o modal
    setLoading(true); // Faz a requisição de novo
    setFilterDate(filterTempDate); // Atualiza o estado com a data filtrada
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Serviços</Text>

      {/* Botão de Filtro */}
      <TouchableOpacity style={styles.buttonFilter} onPress={handleOpenFilterModal}>
        <Text style={styles.buttonFilterText}>Filtrar por Data</Text>
      </TouchableOpacity>

      <FlatList
        data={historico}
        renderItem={renderHistoricoItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Modal de Detalhes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalhes do Serviço</Text>
            {selectedItem && (
              <>
                <Text style={styles.modalText}>Descrição: {selectedItem.descricao}</Text>
                <Text style={styles.modalText}>Data: {new Date(selectedItem.data_registro).toLocaleDateString()}</Text>
                <Text style={styles.modalText}>Modelo da Bicicleta: {selectedItem.modelo}</Text>
                <Text style={styles.modalText}>Tipo de Serviço: {selectedItem.tipo}</Text>
                <Text style={styles.modalText}>Nome do Usuário: {selectedItem.nome}</Text>
                <Text style={styles.modalText}>Email: {selectedItem.email}</Text>
                <Text style={styles.modalText}>Telefone: {selectedItem.telefone}</Text>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal} style={styles.buttonClose}>
              <Text style={styles.buttonCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Filtro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={handleCloseFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar por Data</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="Digite a data (YYYY-MM-DD)"
              value={filterTempDate} // Usar o estado temporário para captura da data
              onChangeText={setFilterTempDate} // Alterar o valor no estado temporário
            />
            <TouchableOpacity onPress={handleApplyFilter} style={styles.buttonApplyFilter}>
              <Text style={styles.buttonApplyFilterText}>Aplicar Filtro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseFilterModal} style={styles.buttonClose}>
              <Text style={styles.buttonCloseText}>Fechar</Text>
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
  buttonDetails: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonDetailsText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonFilter: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonFilterText: {
    color: '#FFF',
    fontSize: 16,
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
    marginBottom: 5,
  },
  buttonClose: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonCloseText: {
    color: '#FFF',
    fontSize: 18,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16,
  },
  buttonApplyFilter: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonApplyFilterText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoricoServicosLojista;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const HistoricoServicosLojista = ({ route }) => {
  const { id_lojista } = route.params;
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('ate');
  const [filtering, setFiltering] = useState(false);

  const fetchHistorico = async (filterDate = '', tipoFiltro = '') => {
    setLoading(true);
    try {
      let url = `http://localhost:3000/historico/lojista/${id_lojista}`;
      if (filterDate) {
        url += `?data=${filterDate}&tipoFiltro=${tipoFiltro}`;
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

  useEffect(() => {
    fetchHistorico(); // Carrega todos os registros ao abrir a página
  }, [id_lojista]);

  useEffect(() => {
    if (filtering) {
      fetchHistorico(filterDate, tipoFiltro); // Aplica o filtro se o usuário clicar no "Aplicar Filtro"
      setFiltering(false); // Reseta o estado de filtragem
    }
  }, [filtering, filterDate, tipoFiltro]);

  const renderHistoricoItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Nome: {item.nome}</Text>
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

  const handleApplyFilter = () => {
    setFiltering(true); // Ativa a busca com o filtro
    setFilterModalVisible(false);  // Fecha o modal ao aplicar o filtro
  };

  const handleResetFilter = () => {
    setFilterDate(''); // Limpa a data
    setTipoFiltro('ate'); // Restaura o tipo de filtro
    setFiltering(true); // Aplica a busca sem filtro
    setFilterModalVisible(false); // Fecha o modal
  };

  const handleDateSelect = (day) => {
    setFilterDate(day.dateString); // Atualiza a data do filtro
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Serviços</Text>

      {/* Botão de Filtro */}
      <TouchableOpacity style={styles.buttonFilter} onPress={() => setFilterModalVisible(true)}>
        <Text style={styles.buttonFilterText}>Filtrar por Data</Text>
      </TouchableOpacity>

      {/* Verifica se a lista de histórico está vazia ou em carregamento */}
      {historico.length === 0 && !loading && filtering && (
        <Text style={styles.noRecordText}>Nenhum Registro Encontrado</Text>
      )}

      {/* Exibe os dados do histórico ou mensagem de "Nenhum Registro Encontrado" */}
      {!filtering && !loading && historico.length === 0 && (
        <Text style={styles.noRecordText}>Nenhum Registro Encontrado</Text>
      )}

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
                <Text style={styles.modalText}>Nome: {selectedItem.nome}</Text>
                <Text style={styles.modalText}>Descrição: {selectedItem.descricao}</Text>
                <Text style={styles.modalText}>Data: {new Date(selectedItem.data_registro).toLocaleDateString()}</Text>
                <Text style={styles.modalText}>Modelo da Bicicleta: {selectedItem.modelo}</Text>
                <Text style={styles.modalText}>Tipo de Serviço: {selectedItem.tipo}</Text>
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
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filtrar por Data</Text>
            
            {/* Calendário para seleção de data */}
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{ [filterDate]: { selected: true, selectedColor: 'blue' } }} // Marca a data selecionada
            />
            
            {/* Opções de tipo de filtro */}
            <View style={styles.filterOptions}>
              <TouchableOpacity 
                style={[styles.filterOption, tipoFiltro === 'ate' && styles.selectedOption]}
                onPress={() => setTipoFiltro('ate')}
              >
                <Text style={styles.filterOptionText}>Até a Data</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterOption, tipoFiltro === 'antes' && styles.selectedOption]}
                onPress={() => setTipoFiltro('antes')}
              >
                <Text style={styles.filterOptionText}>Antes da Data</Text>
              </TouchableOpacity>
            </View>

            {/* Botão para Resetar Filtro */}
            <TouchableOpacity 
              style={styles.buttonResetFilter} 
              onPress={handleResetFilter}
            >
              <Text style={styles.buttonResetFilterText}>Resetar Filtro</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleApplyFilter} style={styles.buttonApplyFilter}>
              <Text style={styles.buttonApplyFilterText}>Aplicar Filtro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)} style={styles.buttonClose}>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  buttonClose: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCloseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRecordText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  filterOptions: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterOption: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#FF6F00',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000',
  },
  buttonApplyFilter: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonApplyFilterText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonResetFilter: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonResetFilterText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoricoServicosLojista;
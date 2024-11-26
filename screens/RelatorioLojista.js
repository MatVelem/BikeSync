import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const RelatorioLojista = ({ route, navigation }) => {
  const [relatorio, setRelatorio] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const [isValueModalVisible, setIsValueModalVisible] = useState(false);
  const { id_lojista } = route.params;

  const colorMapping = {
    "Revisão Completa": '#FF6347',
    "Troca de Pneus": '#4682B4',
    "Revisão de Freios": '#32CD32',
  };

  useEffect(() => {
    fetch(`http://localhost:3000/relatorios/${id_lojista}`)
      .then((response) => response.json())
      .then((json) => {
        const chartData = json.data.map(item => ({
          name: item.name,
          quantidade: item.quantidade,
          color: colorMapping[item.name] || '#808080',
        }));
        setRelatorio({
          chartData,
          totalServicos: json.totalServicos,
        });
      })
      .catch((error) => console.error(error));
  }, [id_lojista]);

  useEffect(() => {
    fetch(`http://localhost:3000/valorTotalServicos/${id_lojista}`)
      .then((response) => response.json())
      .then((json) => {
        const totalGeral = json.totalGeral || 0;
        setValorTotal(totalGeral);  // Use o totalGeral retornado pelo backend
      })
      .catch((error) => console.error(error));
  }, [id_lojista]);

  if (!relatorio) return <Text>Carregando...</Text>;

  const handlePress = (entry) => {
    setSelectedService(entry);
  };

  const getLegendFontSize = (serviceName) => {
    if (serviceName === "Revisão Completa") return 20;
    if (serviceName === "Troca de Pneus") return 20;
    if (serviceName === "Revisão de Freios") return 20;
    return 15;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Relatório de Serviços</Text>
        <Text style={styles.totalServicos}>Total de Serviços: {relatorio.totalServicos}</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsValueModalVisible(true)}
        >
          <Text style={styles.buttonText}>Ver Valor Total</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isValueModalVisible}
          onRequestClose={() => setIsValueModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Valor Total dos Serviços</Text>
              <Text style={styles.modalText}>R$ {valorTotal}</Text>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => setIsValueModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsGraphModalVisible(true)}
        >
          <Text style={styles.buttonText}>Serviços Realizados</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isGraphModalVisible}
          onRequestClose={() => setIsGraphModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Gráfico de Serviços</Text>
              <Text style={styles.modalText}>Total de Serviços: {relatorio.totalServicos}</Text>
              <Text style={styles.graphTitle}>Tipo de serviços mais realizados</Text>
              <View style={styles.chartContainer}>
                <PieChart
                  data={relatorio.chartData.map(item => ({
                    name: item.name,
                    population: item.quantidade,
                    color: selectedService?.name === item.name ? '#FFD700' : item.color,
                    legendFontColor: "#000",
                    legendFontSize: getLegendFontSize(item.name),
                  }))}
                  width={Dimensions.get('window').width - 40}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#000',
                    backgroundGradientFrom: '#FFB400',
                    backgroundGradientTo: '#FFB400',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                  onPress={(entry) => handlePress(entry)}
                />
              </View>

              {selectedService && (
                <View style={styles.selectedServiceInfo}>
                  <Text style={[styles.selectedServiceText, { color: '#000' }]}>
                    Serviço: {selectedService.name}
                  </Text>
                  <Text style={[styles.selectedServiceText, { color: '#000' }]}>
                    Quantidade: {selectedService.population}
                  </Text>
                </View>
              )}

              <TouchableOpacity 
                style={styles.button} 
                onPress={() => setIsGraphModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RelatoriosDetalhados', { id_lojista })}
        >
          <Text style={styles.buttonText}>Acessar Relatórios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  totalServicos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFB400',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectedServiceInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  selectedServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RelatorioLojista;

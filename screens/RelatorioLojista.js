import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const RelatorioLojista = ({ route, navigation }) => {
  const [relatorio, setRelatorio] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { id_lojista } = route.params;

  // Mapeamento de cores para cada tipo de serviço
  const colorMapping = {
    "Revisão Completa": '#FF6347',   // Tomate
    "Troca de Pneus": '#4682B4',     // Azul aço
    "Revisão de Freios": '#32CD32',  // Verde limão
  };

  useEffect(() => {
    fetch(`http://localhost:3000/relatorios/${id_lojista}`)
      .then((response) => response.json())
      .then((json) => {
        // Mapeando os dados para incluir as cores
        const chartData = json.data.map(item => ({
          name: item.name,
          quantidade: item.quantidade,
          color: colorMapping[item.name] || '#808080', // Cinza padrão se não encontrado no mapeamento
        }));
        setRelatorio({
          chartData,
          totalServicos: json.totalServicos,  // Incluindo o total de serviços
        });
      })
      .catch((error) => console.error(error));
  }, [id_lojista]);

  if (!relatorio) return <Text>Carregando...</Text>;

  // Função de toque para exibir detalhes e destacar a fatia
  const handlePress = (entry) => {
    setSelectedService(entry);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Relatório de Serviços</Text>
        <Text style={styles.totalServicos}>Total de Serviços: {relatorio.totalServicos}</Text>

        <PieChart
          data={relatorio.chartData.map(item => ({
            name: item.name,
            population: item.quantidade,
            color: selectedService?.name === item.name ? '#FFD700' : item.color, // Dourado para fatia selecionada
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
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

        {/* Exibindo a informação do serviço selecionado */}
        {selectedService && (
          <View style={styles.selectedServiceInfo}>
            <Text style={styles.selectedServiceText}>
              Serviço: {selectedService.name}
            </Text>
            <Text style={styles.selectedServiceText}>
              Quantidade: {selectedService.population}
            </Text>
          </View>
        )}

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
  selectedServiceInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  selectedServiceText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 5,
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
});

export default RelatorioLojista;

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const RelatorioLojista = ({ idLojista }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:3006/relatorios/${idLojista}`)
      .then(response => response.json())
      .then(results => {
        const chartData = results.map(item => ({
          name: item.name,
          population: item.quantidade,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,  // cor aleatória
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        }));
        setData(chartData);
      })
      .catch(error => console.error(error));
  }, [idLojista]);

  return (
    <View>
      <Text>Relatório de Serviços</Text>
      {data.length > 0 ? (
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
        />
      ) : (
        <Text>Carregando dados...</Text>
      )}
    </View>
  );
};

export default RelatorioLojista;

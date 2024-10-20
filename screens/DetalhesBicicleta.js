import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetalhesBicicleta = ({ route }) => {
  const { bike } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bikeTitle}>{bike.marca} - {bike.modelo}</Text>
        <Text style={styles.bikeSerial}>Serial: {bike.serial}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>INFORMAÇÃO DO EQUIPAMENTO:</Text>
        <Text style={styles.detail}>Marca: {bike.marca}</Text>
        <Text style={styles.detail}>Modelo: {bike.modelo}</Text>
        <Text style={styles.detail}>Ano: {bike.ano}</Text>
        <Text style={styles.detail}>Tamanho de Roda: {bike.tamanhoRoda}</Text>
        <Text style={styles.detail}>Tamanho de Quadro: {bike.tamanhoQuadro}</Text>
        <Text style={styles.detail}>Kit Transmissão: {bike.transmissao}</Text>
        <Text style={styles.detail}>Material: {bike.material}</Text>
        <Text style={styles.detail}>Tipo: {bike.tipo}</Text>

        <Text style={styles.detail}>Cor:</Text>
        <View style={styles.colorContainer}>
          {bike.cor.map((color, index) => (
            <View key={index} style={[styles.colorBox, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A623',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  bikeTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bikeSerial: {
    color: '#fff',
    fontSize: 18,
  },
  detailsContainer: {
    padding: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 5,
  },
});

export default DetalhesBicicleta;

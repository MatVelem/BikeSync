import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const MinhasBicicletasScreen = ({ navigation }) => {
  const bicicletas = [
    { id: 1, nome: 'Bicicleta Vermelha', marca: 'COLLI', modelo: 'HILLS', ano: '2023/2024', tamanhoRoda: 'ARO 29', tamanhoQuadro: 'TAM-19', cor: ['#ff0000', '#00ffff'], transmissao: 'SHIMANO 24v', material: 'ALUMINIO', serial: 'BC02Y123', tipo: 'MOUNTAIN BIKE' },
    { id: 2, nome: 'Bicicleta Laranja', marca: 'COLLI', modelo: 'TERRA', ano: '2022/2023', tamanhoRoda: 'ARO 27', tamanhoQuadro: 'TAM-17', cor: ['#ff8800', '#00ff00'], transmissao: 'SHIMANO 21v', material: 'AÇO', serial: 'BC02Y456', tipo: 'URBANA' },
    // Adicione mais bicicletas se necessário
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>BikeSync</Text>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem vindo!</Text>
        <Text style={styles.userName}>Teste</Text>
      </View>

      <View style={styles.bikeGrid}>
        {bicicletas.map((bike) => (
          <TouchableOpacity
            key={bike.id}
            style={styles.bikeItem}
            onPress={() => navigation.navigate('DetalhesBicicleta', { bike })} // Envia o objeto bicicleta para a próxima tela
          >
            <Text style={styles.bikeName}>{bike.nome}</Text>
          </TouchableOpacity>
        ))}
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
    padding: 15,
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bikeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  bikeItem: {
    backgroundColor: '#FFF',
    width: '45%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MinhasBicicletasScreen;

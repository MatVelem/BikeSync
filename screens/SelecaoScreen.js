import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelecaoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma Opção</Text>

      {/* Botão para navegar para Minhas Bicicletas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MinhasBicicletas')}
      >
        <Text style={styles.buttonText}>Minhas Bicicletas</Text>
      </TouchableOpacity>

      {/* Botão para navegar para Adicionar Nova Bicicleta */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdicionarBicicleta')}
      >
        <Text style={styles.buttonText}>Adicionar Nova Bicicleta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB400', // Cor de fundo laranja
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFB400',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelecaoScreen;

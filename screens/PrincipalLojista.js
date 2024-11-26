import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const Lojista = ({ navigation, route }) => {
  const {id_lojista } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/bikesyncimagem.png')} style={styles.logo} />
        <View style={styles.icons}>
          <Image source={{ uri: '../assets/usuario.png' }} style={styles.icon} />
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Painel do Lojista</Text>
      </View>

      <TouchableOpacity
         style={styles.historicoButton}
        onPress={() => {
        console.log('ID do lojista:', route.params.id_lojista); // Verificar se o id está correto
        navigation.navigate('HistoricoServicosLojista', { id_lojista: route.params.id_lojista });
         }}
        >
       <Text style={styles.historicoButtonText}>HISTÓRICO</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RelatorioLojista', { id_lojista })}
      >
        <Text style={styles.buttonText}>Acessar Relatórios</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ServiçosLojista', { id_lojista: route.params.id_lojista })}
      >
        <Text style={styles.addButtonText}>Serviços</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('OrdensLojista', { id_lojista: route.params.id_lojista })}
      >
        <Text style={styles.addButtonText}>Ver ordens</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  list: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFB400',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historicoButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  historicoButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },  
});

export default Lojista;
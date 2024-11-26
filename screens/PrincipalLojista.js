import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Lojista = ({ navigation, route }) => {
  const { id_lojista } = route.params;
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

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.primaryButton]}
            onPress={() => {
              console.log('ID do lojista:', route.params.id_lojista); // Verificar se o id está correto
              navigation.navigate('HistoricoServicosLojista', { id_lojista: route.params.id_lojista });
            }}
          >
            <Text style={styles.buttonText}>HISTÓRICO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.dangerButton]}
            onPress={() => navigation.navigate('RelatorioLojista', { id_lojista })}
          >
            <Text style={styles.buttonText}>Relatórios</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.infoButton]}
            onPress={() => navigation.navigate('ServiçosLojista', { id_lojista: route.params.id_lojista })}
          >
            <Text style={styles.buttonText}>Editar Serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.successButton]}
            onPress={() => navigation.navigate('OrdensLojista', { id_lojista: route.params.id_lojista })}
          >
            <Text style={styles.buttonText}>Solicitações</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.warningButton]}
          onPress={() => navigation.navigate('OrdensAceitas', { id_lojista: route.params.id_lojista })}
        >
          <Text style={styles.buttonText}>Serviços em Andamento</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  dangerButton: {
    backgroundColor: '#e74c3c',
  },
  infoButton: {
    backgroundColor: '#8e44ad',
  },
  successButton: {
    backgroundColor: '#2ecc71',
  },
  warningButton: {
    backgroundColor: '#f39c12',
  },
});

export default Lojista;

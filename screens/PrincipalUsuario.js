import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PrincipalUsuario = ({ navigation, route }) => {
  const { nome, id_usuario } = route.params; // Recebe o id_usuario junto com o nome

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')}
          style={styles.logo}
        />
        <View style={styles.icons}>
          <Image
            source={{ uri: '../assets/usuario.png' }}
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://link-do-icone-perfil.com/icone.png' }}
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
        <Text style={styles.userName}>{nome}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {/* Botão para exibir Minhas Bicicletas */}
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.primaryButton]}
            onPress={() => navigation.navigate('MinhasBicicletas', { id_usuario })} // Passa o id_usuario para a tela de Minhas Bicicletas
          >
            <Text style={styles.buttonText}>MINHAS BICICLETAS</Text>
          </TouchableOpacity>

          {/* Botão "Adicionar Nova Bicicleta" */}
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.dangerButton]}
            onPress={() => navigation.navigate('AdicionarBicicleta', { id_usuario, nome })} // Passa o id_usuario para a tela de Adicionar Bicicleta
          >
            <Text style={styles.buttonText}>NOVA BICICLETA +</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {/* Botão para exibir Lojas */}
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.infoButton]}
            onPress={() => navigation.navigate('Lojas')} // Navega para a tela de Lojas
          >
            <Text style={styles.buttonText}>VER LOJAS</Text>
          </TouchableOpacity>

          {/* Botão para exibir Histórico */}
          <TouchableOpacity
            style={[styles.button, styles.smallButton, styles.successButton]}
            onPress={() => navigation.navigate('Historico', { id_usuario })} // Passa o id_usuario para a tela de Histórico
          >
            <Text style={styles.buttonText}>HISTÓRICO</Text>
          </TouchableOpacity>
        </View>

        {/* Botão para agendar um serviço */}
        <TouchableOpacity
          style={[styles.button, styles.warningButton]}
          onPress={() => navigation.navigate('LojasScreen', { id_usuario })} // Navega para a tela de Serviços
        >
          <Text style={styles.buttonText}>AGENDAR UM SERVIÇO</Text>
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
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  userName: {
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

export default PrincipalUsuario;

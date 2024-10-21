import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PrincipalUsuario = ({ navigation, route }) => {
  const { nome } = route.params;

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

      {/* Botão para exibir Minhas Bicicletas */}
      <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('MinhasBicicletas', { id_usuario: 1 })} // Substitua 1 pelo ID do usuário atual
>
  <Text style={styles.buttonText}>VER MINHAS BICICLETAS</Text>
</TouchableOpacity>


      {/* Botão "Adicionar Nova Bicicleta" */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarBicicleta')}
      >
        <Text style={styles.addButtonText}>ADICIONAR NOVA BICICLETA +</Text>
      </TouchableOpacity>
    </View>
  );
};

// Definição dos estilos
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
    width: 100,
    height: 100,
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
});

export default PrincipalUsuario; // Certifique-se de que a exportação está correta

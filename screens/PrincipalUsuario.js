<<<<<<< Updated upstream:screens/Principal.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com logotipo e ícones */}
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')} // Substitua pelo caminho correto do logotipo
          style={styles.logo}
        />
        <View style={styles.icons}>
          <Image
            source={{ uri: '../assets/usuario.png' }} // Substitua pelo link do ícone de conversa
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://link-do-icone-perfil.com/icone.png' }} // Substitua pelo link do ícone de perfil
            style={styles.icon}
          />
        </View>
      </View>

      {/* Saudação e nome do usuário */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem vindo!</Text>
        <Text style={styles.userName}>Usuário</Text>
      </View>

      {/* Botão "Minhas Bicicletas" */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Minhas Bicicletas</Text>
      </TouchableOpacity>

      {/* Botão "Adicionar Nova Bicicleta" */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADICIONAR NOVA BICICLETA +</Text>
      </TouchableOpacity>

      {/* Barra de navegação com ícones */}
      <View style={styles.navigationBar}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-casa.com/icone.png' }} // Substitua pelo link do ícone da casa
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-loja.com/icone.png' }} // Substitua pelo link do ícone da loja
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-bicicleta.com/icone.png' }} // Substitua pelo link do ícone da bicicleta
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-ferramenta.com/icone.png' }} // Substitua pelo link do ícone da ferramenta
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400', // Cor de fundo laranja
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
    marginTop: -190,
    color: '#000',
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -30,
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
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
=======
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const PrincipalUsuario = ({ navigation, route }) => {
  // Captura o nome do usuário dos parâmetros de navegação
  const { nome } = route.params;

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logotipo e ícones */}
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')} // Substitua pelo caminho correto do logotipo
          style={styles.logo}
        />
        <View style={styles.icons}>
          <Image
            source={{ uri: '../assets/usuario.png' }} // Substitua pelo link correto do ícone de usuário
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://link-do-icone-perfil.com/icone.png' }} // Substitua pelo link correto do ícone de perfil
            style={styles.icon}
          />
        </View>
      </View>

      {/* Saudação e nome do usuário */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
        <Text style={styles.userName}>{nome}</Text> {/* Exibe o nome do usuário */}
      </View>

      {/* Botão "Minhas Bicicletas" */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MinhasBicicletas')} // Navega para MinhasBicicletasScreen
      >
        <Text style={styles.buttonText}>Minhas Bicicletas</Text>
      </TouchableOpacity>

      {/* Botão "Adicionar Nova Bicicleta" */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarBicicleta')} // Navega para AdicionarBicicletaScreen
      >
        <Text style={styles.addButtonText}>ADICIONAR NOVA BICICLETA +</Text>
      </TouchableOpacity>

      {/* Barra de navegação com ícones */}
      <View style={styles.navigationBar}>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-casa.com/icone.png' }} // Substitua pelo link correto do ícone da casa
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-loja.com/icone.png' }} // Substitua pelo link correto do ícone da loja
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-bicicleta.com/icone.png' }} // Substitua pelo link correto do ícone da bicicleta
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://link-do-icone-ferramenta.com/icone.png' }} // Substitua pelo link correto do ícone da ferramenta
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos usados na tela
  container: {
    flex: 1,
    backgroundColor: '#FFB400', // Cor de fundo laranja
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
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default PrincipalUsuario;
>>>>>>> Stashed changes:screens/PrincipalUsuario.js

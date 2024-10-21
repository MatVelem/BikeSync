import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function Entrada({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao BikeSync!</Text>
      
      <View style={styles.buttonContainer}>
        <Image source={require('../assets/loginusuario.png')} style={styles.image} />
        <Button 
          title="Login como Usuário"
          onPress={() => navigation.navigate('Login', { tipoLogin: 'usuario' })} 
        />
      </View>

      <View style={styles.buttonContainer}>
        <Image source={require('../assets/loginlojista.png')} style={styles.image} />
        <Button 
          title="Login como Lojista"
          onPress={() => navigation.navigate('Login', { tipoLogin: 'lojista' })} 
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8b703',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200, // Ajuste o tamanho conforme necessário
    height:200,
    marginBottom: 10,
  },
});


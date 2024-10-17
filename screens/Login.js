import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useState } from 'react';

export default function Login({navigation}) {

  const entrar = () => {
    navigation.reset({
      index: 0,
      routes: [{name: "Principal"}]
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Adicionando a imagem */}
      <Image
        source={require('../assets/bikesyncimagem.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>BikeSync</Text>
      <Text style={styles.subtitle}>
        Conectando você ao cuidado ideal para sua bicicleta!
      </Text>

      <View style={styles.loginBox}>
        <Text h4 style={styles.loginTitle}>Faça login na sua conta</Text>

        <Input
          placeholder="E-mail"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          containerStyle={styles.input}
          keyboardType="email-address"
        />

        <Input
          placeholder="Senha"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          containerStyle={styles.input}
          secureTextEntry={!showPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                type="font-awesome"
                name={showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          }
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="ENTRAR"
          buttonStyle={styles.loginButton}
          icon={
            <Icon
              name="arrow-right"
              size={20}
              color="white"
            />
          }
          onPress={entrar}  
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8b703',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 20, 
  },
  title: {

    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    marginTop: -20
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 30,
    textAlign: 'left',
  },
  loginBox: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#f4d207',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#ff7900',
    borderRadius: 5,
    paddingVertical: 10,
  },
  optionsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#ff7900',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});

import { StatusBar } from 'expo-status-bar';
<<<<<<< Updated upstream
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

=======
import { StyleSheet, View, TouchableOpacity, Image, Alert, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useState } from 'react';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Novo estado para a mensagem de erro

  // Pega o tipo de login da rota
  const { tipoLogin } = route.params;

  const entrar = () => {
    setErrorMessage(''); // Limpa a mensagem de erro ao tentar fazer login
  
    if (email === '' || senha === '') {
      setErrorMessage('Por favor, preencha todos os campos.'); // Atualiza a mensagem de erro
      return;
    }
  
    console.log("Dados do login:", { email, senha, tipoLogin });
  
    // Faz a requisição para o back-end
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha, tipoLogin }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            // Atualiza a mensagem de erro
            setErrorMessage('Email ou senha inválidos.'); // Mensagem genérica para erro de login
            throw new Error('Email ou senha inválidos.'); // Lança um erro com a mensagem genérica
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          Alert.alert('Sucesso', 'Login bem-sucedido!');
          // Redireciona para a tela principal com os dados do usuário
          navigation.reset({ 
            index: 0, 
            routes: [{ name: 'PrincipalUsuario', params: { nome: data.user.nome } }] 
          });
        }
      })
      .catch(error => {
        console.error("Error:", error); // Log do erro no console
        setErrorMessage('Email ou senha inválidos.'); // Mensagem de erro genérica ao capturar o erro
      });
  };
  
>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <Image source={require('../assets/bikesyncimagem.png')} style={styles.logo} />

      <Text style={styles.title}>BikeSync</Text>
      <Text style={styles.subtitle}>Conectando você ao cuidado ideal para sua bicicleta!</Text>

      <View style={styles.loginBox}>
        <Text h4 style={styles.loginTitle}>Faça login na sua conta</Text>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text> // Exibe a mensagem de erro
        ) : null}

        <Input
          placeholder="E-mail"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          containerStyle={styles.input}
          keyboardType="email-address"
<<<<<<< Updated upstream
=======
          value={email}
          onChangeText={setEmail}
>>>>>>> Stashed changes
        />

        <Input
          placeholder="Senha"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          containerStyle={styles.input}
          secureTextEntry={!showPassword}
<<<<<<< Updated upstream
=======
          value={senha}
          onChangeText={setSenha}
>>>>>>> Stashed changes
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon type="font-awesome" name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
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
          icon={<Icon name="arrow-right" size={20} color="white" />}
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
    marginTop: -20,
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
  errorMessage: {
    color: 'red', // Estilo para a mensagem de erro
    marginBottom: 10,
    textAlign: 'center',
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

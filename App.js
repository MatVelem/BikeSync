import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Principal from './screens/Principal';
import MinhasBicicletasScreen from './screens/MinhasBicicletasScreen';
import AdicionarBicicletaScreen from './screens/AdicionarBicicletaScreen';
import DetalhesBicicleta from './screens/DetalhesBicicleta'; 

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Principal" 
        component={Principal} 
        options={{ title: 'Principal' }}
      />
      <Stack.Screen 
        name="MinhasBicicletas" 
        component={MinhasBicicletasScreen} 
        options={{ title: 'Minhas Bicicletas' }}
      />
      <Stack.Screen 
        name="AdicionarBicicleta" 
        component={AdicionarBicicletaScreen} 
        options={{ title: 'Adicionar Bicicleta' }}
      />
      <Stack.Screen 
        name="DetalhesBicicleta" 
        component={DetalhesBicicleta} // Nova tela de detalhes
        options={{ title: 'Detalhes da Bicicleta' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

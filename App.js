import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Entrada from './screens/Entrada';
import Login from './screens/Login';
<<<<<<< Updated upstream
import Principal from './screens/Principal';
=======
import PrincipalUsuario from './screens/PrincipalUsuario';
import MinhasBicicletasScreen from './screens/MinhasBicicletasScreen';
import AdicionarBicicletaScreen from './screens/AdicionarBicicletaScreen';
import DetalhesBicicleta from './screens/DetalhesBicicleta'; 
>>>>>>> Stashed changes

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen 
        name="Entrada" 
        component={Entrada} 
        options={{ title: 'Entrada' }}
      />

      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="PrincipalUsuario" 
        component={PrincipalUsuario} 
        options={{ title: 'PrincipalUsuario' }}
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
};

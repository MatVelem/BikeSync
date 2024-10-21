import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Entrada from './screens/Entrada';
import Login from './screens/Login';
import PrincipalUsuario from './screens/PrincipalUsuario';
import MinhasBicicletasScreen from './screens/MinhasBicicletasScreen'; // Adicione isso

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
        options={{ title: 'Principal do Usuário' }}
      />
      <Stack.Screen 
        name="MinhasBicicletas" 
        component={MinhasBicicletasScreen} // Adicione isso
        options={{ title: 'Minhas Bicicletas' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Entrada from './screens/Entrada';
import Login from './screens/Login';
import PrincipalUsuario from './screens/PrincipalUsuario';
import MinhasBicicletasScreen from './screens/MinhasBicicletasScreen'; // Adicione isso
import AdicionarBicicletaScreen from './screens/AdicionarBicicletaScreen';
<<<<<<< HEAD
import PrincipalLojista from './screens/PrincipalLojista';
=======
import Lojas from './screens/Lojas';
>>>>>>> 62ff7e22d37dcf2cc843765c5f68e4b5888eb7e2

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
        name="PrincipalLojista" 
        component={PrincipalLojista} // Adicione isso
        options={{ title: 'PrincipalLojista' }}
        />
      <Stack.Screen 
        name="MinhasBicicletas" 
        component={MinhasBicicletasScreen} 
        options={{ title: 'Minhas Bicicletas' }}
      />
      <Stack.Screen 
        name="AdicionarBicicleta" 
        component={AdicionarBicicletaScreen} // Adicione isso
        options={{ title: 'Adicionar Bicicleta' }}
        />
        <Stack.Screen
        name="Lojas"
        component={Lojas}
        options={{ tittle:'Lojas' }}
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

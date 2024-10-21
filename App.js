import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Entrada from './screens/Entrada';
import Login from './screens/Login';
import PrincipalUsuario from './screens/PrincipalUsuario';  // Verifique se o caminho está correto

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
        component={PrincipalUsuario}  // Aqui deve referenciar corretamente
        options={{ title: 'PrincipalUsuario' }}
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

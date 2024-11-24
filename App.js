import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Entrada from './screens/Entrada';
import Login from './screens/Login';
import PrincipalUsuario from './screens/PrincipalUsuario';
import MinhasBicicletasScreen from './screens/MinhasBicicletasScreen'; 
import AdicionarBicicletaScreen from './screens/AdicionarBicicletaScreen';
import PrincipalLojista from './screens/PrincipalLojista'; 
import Lojas from './screens/Lojas';
import HistoricoServicosLojista from './screens/HistoricoServicosLojista';
import Historico from './screens/Historico';
import Servicos from './screens/Servicos';
import EscolherBicicletaScreen from './screens/EscolherBicicleta';
import RelatorioLojista from './screens/RelatorioLojista';
import ServicosLojista from './screens/ServicosLojista';

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
        component={PrincipalLojista} 
        options={{ title: 'PrincipalLojista' }}
        />

        <Stack.Screen 
        name="ServiçosLojista" 
        component={ServicosLojista} 
        options={{ title: 'ServiçosLojista' }}
        />

        <Stack.Screen 
        name="HistoricoServicosLojista" 
        component={HistoricoServicosLojista} 
        options={{ title: 'HistoricoServicosLojista' }}
        />

      <Stack.Screen 
        name="MinhasBicicletas" 
        component={MinhasBicicletasScreen} 
        options={{ title: 'Minhas Bicicletas' }}
      />

      <Stack.Screen 
        name="RelatorioLojista" 
        component={RelatorioLojista} 
        options={{ title: 'RelatorioLojista' }}
        />

      <Stack.Screen 
        name="AdicionarBicicleta" 
        component={AdicionarBicicletaScreen} 
        options={{ title: 'Adicionar Bicicleta' }}
        />
        <Stack.Screen
        name="Lojas"
        component={Lojas}
        options={{ title:'Lojas' }}
        />
        <Stack.Screen
        name="Historico"
        component={Historico}
        options={{ title:'Historico'}}
        />
      <Stack.Screen
      name="Servicos"
      component={Servicos}
      options={{ title:'Serviços'}}
      />
      <Stack.Screen
      name="EscolherBicicleta"
      component={EscolherBicicletaScreen}
      options={{ title:'Agendar serviço'}}
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

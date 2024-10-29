import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { fetchAgendamentos, fetchRelatorios } from '../api'; // Supondo que você tenha funções para buscar dados

const Lojista = ({ navigation, route }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const agendamentosData = await fetchAgendamentos(); // Função para buscar agendamentos
        const relatoriosData = await fetchRelatorios(); // Função para buscar relatórios
        setAgendamentos(agendamentosData);
        setRelatorios(relatoriosData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const renderAgendamentoItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Cliente: {item.nome_cliente}</Text>
      <Text style={styles.itemText}>Data: {item.data_agendamento}</Text>
      <Text style={styles.itemText}>Serviço: {item.servico}</Text>
    </View>
  );

  const renderRelatorioItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Relatório de: {item.tipo}</Text>
      <Text style={styles.itemText}>Data: {item.data}</Text>
      <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
    </View>
  );

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com logotipo e ícones */}
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')} // Caminho da imagem do logotipo
          style={styles.logo}
        />
        <View style={styles.icons}>
          <Image
            source={{ uri: '../assets/usuario.png' }}
            style={styles.icon}
          />
          <Image
            source={{ uri: 'https://link-do-icone-perfil.com/icone.png' }}
            style={styles.icon}
          />
        </View>
      </View>

      {/* Informações do Lojista */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Painel do Lojista</Text>
      </View>

      {/* Lista de Agendamentos */}
      <Text style={styles.subtitle}>Agendamentos</Text>
      <FlatList
        data={agendamentos}
        renderItem={renderAgendamentoItem}
        keyExtractor={item => item.id_agendamento.toString()}
        style={styles.list}
      />

      {/* Lista de Relatórios */}
      <Text style={styles.subtitle}>Relatórios</Text>
      <FlatList
        data={relatorios}
        renderItem={renderRelatorioItem}
        keyExtractor={item => item.id_relatorio.toString()}
        style={styles.list}
      />

      {/* Botão de Ação para Relatórios */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Relatorio', { id_lojista: route.params.id_lojista })}
      >
        <Text style={styles.buttonText}>VER RELATÓRIOS DETALHADOS</Text>
      </TouchableOpacity>

      {/* Botão de Ação para Agendamentos */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Agendar', { id_lojista: route.params.id_lojista })}
      >
        <Text style={styles.addButtonText}>AGENDAR NOVO SERVIÇO</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
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
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  list: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
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
});

export default Lojista;

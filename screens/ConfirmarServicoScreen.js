import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmarServicoScreen = ({ route }) => {
  const { id_usuario, id_bicicleta, id_tipo_servico, id_lojista } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [bicicleta, setBicicleta] = useState(null);
  const [servico, setServico] = useState(null);
  const [lojista, setLojista] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const [confirmacao, setConfirmacao] = useState(false);
  const navigation = useNavigation(); // Hook de navegação

  useEffect(() => {
    if (id_bicicleta) {
      fetch(`http://localhost:3000/api/bicicletas/detalhes/${id_bicicleta}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados da bicicleta:', data);
          // Verificar se os dados são válidos antes de atualizar o estado
          if (data && Object.keys(data).length > 0) {
            setBicicleta(data);
          } else {
            throw new Error('Dados da bicicleta não encontrados');
          }
        })
        .catch(error => {
          console.error('Erro ao carregar bicicleta:', error);
          setErro('Não foi possível carregar os dados da bicicleta');
          // Garantir que bicicleta seja null se houver erro
          setBicicleta(null);
        });
    }
  
    if (id_tipo_servico) {
      fetch(`http://localhost:3000/api/tiposervico/${id_tipo_servico}`)
        .then(response => response.json())
        .then(data => {
          console.log('Serviço:', data); // Verificar os dados do serviço
          setServico(data);
        })
        .catch(error => console.error('Erro ao carregar serviço:', error));
    }
  
    if (id_lojista) {
      fetch(`http://localhost:3000/api/lojistas/${id_lojista}`)
        .then(response => response.json())
        .then(data => setLojista(data))
        .catch(error => console.error('Erro ao carregar loja:', error));
    }
  }, [id_bicicleta, id_tipo_servico, id_lojista]);
  
  useEffect(() => {
    if (confirmacao) {
      const timer = setTimeout(() => {
        navigation.navigate('PrincipalUsuario', { id_usuario }); // Redirecionar após 7 segundos
      }, 7000);
      return () => clearTimeout(timer); // Limpar o timeout se o componente for desmontado
    }
  }, [confirmacao, navigation, id_usuario]);
  
  const criarOrdemServico = () => {
    setLoading(true);
    setErro(''); // Limpar erro antes da solicitação
    fetch('http://localhost:3000/api/ordemservico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_usuario,
        id_bicicleta,
        id_tipo_servico,
        id_lojista,
        data: new Date().toISOString().split('T')[0], // Formato de data esperado
        valor: servico ? servico.preco : 0,
        status_pagamento: 'Pendente',
        observacoes,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.error || 'Erro ao criar ordem de serviço') });
        }
        return response.json();
      })
      .then(() => {
        setLoading(false);
        setConfirmacao(true);
      })
      .catch(error => {
        setLoading(false);
        setErro('Erro ao criar ordem de serviço. Tente novamente.');
        console.error('Erro ao criar ordem de serviço:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/bikesyncimagem.png')}
          style={styles.logo}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : confirmacao ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Pedido confirmado com sucesso!</Text>
          <Text style={styles.successSubtitle}>Acompanhe o status na área do cliente.</Text>
          <Image
            source={require('../assets/sucesso.png')}
            style={styles.successImage}
          />
          <Text style={styles.redirectText}>Redirecionando para a página principal...</Text>
          <TouchableOpacity 
            style={styles.manualButton} 
            onPress={() => navigation.navigate('PrincipalUsuario', { id_usuario })}
          >
            <Text style={styles.manualButtonText}>Voltar agora</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Deseja Confirmar o seu pedido?</Text>

          {lojista && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Loja Escolhida:</Text>
              <Text style={styles.detailText}>Nome: {lojista.nome_loja}</Text>
              <Text style={styles.detailText}>Endereço: {lojista.endereco}</Text>
            </View>
          )}

          {bicicleta && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Bicicleta Escolhida:</Text>
              <Text style={styles.detailText}>Marca: {bicicleta.marca}</Text>
              <Text style={styles.detailText}>Modelo: {bicicleta.modelo}</Text>
              <Text style={styles.detailText}>Ano: {bicicleta.ano}</Text>
              <Text style={styles.detailText}>Cor: {bicicleta.cor}</Text>
            </View>
          )}

          {servico && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Serviço Escolhido:</Text>
              <Text style={styles.detailText}>Nome: {servico.nome_tipo}</Text>
              <Text style={styles.detailText}>Descrição: {servico.descricao}</Text>
              <Text style={styles.detailText}>Preço: R$ {servico.preco}</Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Observações (opcional)"
            value={observacoes}
            onChangeText={setObservacoes}
          />

          <TouchableOpacity style={styles.button} onPress={criarOrdemServico}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  detailText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  successImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  redirectText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
  manualButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  manualButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmarServicoScreen;

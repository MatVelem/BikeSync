import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';

const ConfirmarServicoScreen = ({ route }) => {
  const { id_usuario, id_bicicleta, id_tipo_servico, id_lojista } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [bicicleta, setBicicleta] = useState(null);
  const [servico, setServico] = useState(null);
  const [lojista, setLojista] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const [confirmacao, setConfirmacao] = useState(false);

  useEffect(() => {
    if (id_bicicleta) {
      fetch(`http://localhost:3000/api/bicicletas/${id_bicicleta}`)
        .then(response => response.json())
        .then(data => setBicicleta(Array.isArray(data) ? data[0] : data))
        .catch(error => console.error('Erro ao carregar bicicleta:', error));
    }

    if (id_tipo_servico) {
      fetch(`http://localhost:3000/api/tiposervico/${id_tipo_servico}`)
        .then(response => response.json())
        .then(data => setServico(data))
        .catch(error => console.error('Erro ao carregar serviço:', error));
    }

    if (id_lojista) {
      fetch(`http://localhost:3000/api/lojistas/${id_lojista}`)
        .then(response => response.json())
        .then(data => setLojista(data))
        .catch(error => console.error('Erro ao carregar loja:', error));
    }
  }, [id_bicicleta, id_tipo_servico, id_lojista]);

  const criarOrdemServico = () => {
    setLoading(true);
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
        data: new Date().toISOString().split('T')[0],
        valor: servico ? servico.preco : 0,
        status_pagamento: 'Pendente',
        observacoes,
      }),
    })
      .then(response => response.json())
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
        </View>
      ) : (
        <>
          <Text style={styles.title}>Deseja Confirmar o seu pedido?</Text>

          {lojista && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Loja Escolhida:</Text>
              <Text style={styles.detailText}>Nome: {lojista.nome_loja}</Text>
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
});

export default ConfirmarServicoScreen;

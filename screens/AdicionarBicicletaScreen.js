import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const AdicionarBicicletaScreen = ({ navigation }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [tamanhoRoda, setTamanhoRoda] = useState('');
  const [serial, setSerial] = useState('');
  const [tipo, setTipo] = useState('');
  const [cor, setCor] = useState('');
  const [material, setMaterial] = useState('');
  const [kitTransmissao, setKitTransmissao] = useState('');
  const [tamanhoQuadro, setTamanhoQuadro] = useState('');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');

  const handleAdicionarBicicleta = async () => {
    const bicicleta = {
      marca,
      modelo,
      ano: parseInt(ano),
      tamanho_roda: parseInt(tamanhoRoda),
      serial,
      tipo,
      cor,
      material,
      kit_transmissao: kitTransmissao,
      tamanho_quadro: tamanhoQuadro,
      informacoes_adicionais: informacoesAdicionais,
      id_usuario: 1,
    };

    try {
      const response = await fetch('http://localhost:3000/bicicletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bicicleta),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Bicicleta adicionada com sucesso!');
        navigation.navigate('MinhasBicicletas');
      }if (!response.ok) {
        Alert.alert('Erro', 'Não foi possível adicionar a bicicleta.');
      }
    } catch (error) {
      console.error('Erro ao adicionar bicicleta:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Botão para enviar o formulário */}
          <Button title="Adicionar Bicicleta" onPress={handleAdicionarBicicleta} />

          {/* Formulário abaixo do botão */}
          <Text>Marca:</Text>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
            placeholder="Marca:"
          />

          <Text>Modelo:</Text>
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={setModelo}
            placeholder="Modelo:"
          />

          <Text>Ano:</Text>
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
            placeholder="Ano:"
          />

          <Text>Tamanho da Roda:</Text>
          <TextInput
            style={styles.input}
            value={tamanhoRoda}
            onChangeText={setTamanhoRoda}
            keyboardType="numeric"
            placeholder="Tamanho da Roda:"
          />

          <Text>Serial:</Text>
          <TextInput
            style={styles.input}
            value={serial}
            onChangeText={setSerial}
            placeholder="Serial:"
          />

          <Text>Tipo:</Text>
          <TextInput
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
            placeholder="Tipo:"
          />

          <Text>Cor:</Text>
          <TextInput
            style={styles.input}
            value={cor}
            onChangeText={setCor}
            placeholder="Cor:"
          />

          <Text>Material:</Text>
          <TextInput
            style={styles.input}
            value={material}
            onChangeText={setMaterial}
            placeholder="Material:"
          />

          <Text>Kit de Transmissão:</Text>
          <TextInput
            style={styles.input}
            value={kitTransmissao}
            onChangeText={setKitTransmissao}
            placeholder="Kit de Transmissão:"
          />

          <Text>Tamanho do Quadro:</Text>
          <TextInput
            style={styles.input}
            value={tamanhoQuadro}
            onChangeText={setTamanhoQuadro}
            placeholder="Tamanho do Quadro:"
          />

          <Text>Informações Adicionais:</Text>
          <TextInput
            style={styles.input}
            value={informacoesAdicionais}
            onChangeText={setInformacoesAdicionais}
            multiline
            placeholder="Informações Adicionais:"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AdicionarBicicletaScreen;

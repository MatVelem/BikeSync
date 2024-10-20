import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

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
  const [idUsuario] = useState(1); // Use o id real do usuário logado

  const adicionarBicicleta = () => {
    fetch('http://localhost:8081/bicicletas', { // Certifique-se de que a URL está correta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        marca,
        modelo,
        ano,
        tamanho_roda: tamanhoRoda,
        serial,
        tipo,
        cor,
        material,
        kit_transmissao: kitTransmissao,
        tamanho_quadro: tamanhoQuadro,
        informacoes_adicionais: informacoesAdicionais,
        id_usuario: idUsuario,
      }),
    })
      .then((response) => {
        console.log('Response:', response); // Log da resposta do servidor
        if (!response.ok) {
          // Se a resposta não for OK, levanta um erro
          return response.text().then(text => { // Converte o texto de erro
            throw new Error(text || 'Erro ao adicionar bicicleta');
          });
        }
        return response.json(); // Retorna o JSON caso a resposta seja OK
      })
      .then((data) => {
        Alert.alert('Sucesso', 'Bicicleta adicionada com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      })
      .catch((error) => {
        console.error('Error:', error); // Log do erro
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <View>
      <Text>Marca:</Text>
      <TextInput value={marca} onChangeText={setMarca} />
      
      <Text>Modelo:</Text>
      <TextInput value={modelo} onChangeText={setModelo} />
      
      <Text>Ano:</Text>
      <TextInput value={ano} onChangeText={setAno} keyboardType="numeric" />
      
      <Text>Tamanho da Roda:</Text>
      <TextInput value={tamanhoRoda} onChangeText={setTamanhoRoda} keyboardType="numeric" />
      
      <Text>Serial:</Text>
      <TextInput value={serial} onChangeText={setSerial} />
      
      <Text>Tipo:</Text>
      <TextInput value={tipo} onChangeText={setTipo} />
      
      <Text>Cor:</Text>
      <TextInput value={cor} onChangeText={setCor} />
      
      <Text>Material:</Text>
      <TextInput value={material} onChangeText={setMaterial} />
      
      <Text>Kit de Transmissão:</Text>
      <TextInput value={kitTransmissao} onChangeText={setKitTransmissao} />
      
      <Text>Tamanho do Quadro:</Text>
      <TextInput value={tamanhoQuadro} onChangeText={setTamanhoQuadro} />
      
      <Text>Informações Adicionais:</Text>
      <TextInput value={informacoesAdicionais} onChangeText={setInformacoesAdicionais} multiline />
      
      <Button title="Adicionar Bicicleta" onPress={adicionarBicicleta} />
    </View>
  );
};

export default AdicionarBicicletaScreen;

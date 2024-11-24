import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Picker
} from 'react-native';

const AdicionarBicicletaScreen = ({ navigation }) => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
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

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch('http://localhost:3000/marcas');
        if (!response.ok) {
          throw new Error('Erro ao buscar marcas');
        }
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as marcas.');
      }
    };

    fetchMarcas();
  }, []);

  const validarFormulario = () => {
    if (!marcaSelecionada || !modelo || !ano || !tamanhoRoda || !serial) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (isNaN(ano) || isNaN(tamanhoRoda)) {
      Alert.alert('Erro', 'Ano e Tamanho da Roda devem ser numéricos.');
      return false;
    }

    if (serial.length < 5) {
      Alert.alert('Erro', 'O Serial deve ter pelo menos 5 caracteres.');
      return false;
    }

    return true;
  };

  const handleAdicionarBicicleta = async () => {
    if (!validarFormulario()) return;

    const bicicleta = {
      id_marca: marcaSelecionada,
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
      } else {
        const errorResponse = await response.json(); // Obter a resposta de erro
        Alert.alert('Erro', errorResponse.message || 'Não foi possível adicionar a bicicleta.');
      }
    } catch (error) {
      console.error('Erro ao adicionar bicicleta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar adicionar a bicicleta.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Button title="Adicionar Bicicleta" onPress={handleAdicionarBicicleta} color="#000" />

          <Text style={styles.label}>Marca*:</Text>
          <Picker
            selectedValue={marcaSelecionada}
            style={styles.picker}
            onValueChange={(itemValue) => setMarcaSelecionada(itemValue)}
          >
            <Picker.Item label="Selecione uma marca" value="" />
            {marcas.map((marca) => (
              <Picker.Item key={marca.id_marca} label={marca.nome_marca} value={marca.id_marca} />
            ))}
          </Picker>

          <Text style={styles.label}>Modelo*:</Text>
          <TextInput
            style={styles.input}
            value={modelo}
            onChangeText={setModelo}
            placeholder="Modelo"
          />

          <Text style={styles.label}>Ano*:</Text>
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
            placeholder="Ano"
          />

          <Text style={styles.label}>Tamanho da Roda*:</Text>
          <TextInput
            style={styles.input}
            value={tamanhoRoda}
            onChangeText={setTamanhoRoda}
            keyboardType="numeric"
            placeholder="Tamanho da Roda"
          />

          <Text style={styles.label}>Serial*:</Text>
          <TextInput
            style={styles.input}
            value={serial}
            onChangeText={setSerial}
            placeholder="Serial"
          />

          <Text style={styles.label}>Tipo:</Text>
          <TextInput
            style={styles.input}
            value={tipo}
            onChangeText={setTipo}
            placeholder="Tipo"
          />

          <Text style={styles.label}>Cor:</Text>
          <TextInput
            style={styles.input}
            value={cor}
            onChangeText={setCor}
            placeholder="Cor"
          />

          <Text style={styles.label}>Material:</Text>
          <TextInput
            style={styles.input}
            value={material}
            onChangeText={setMaterial}
            placeholder="Material"
          />

          <Text style={styles.label}>Kit de Transmissão:</Text>
          <TextInput
            style={styles.input}
            value={kitTransmissao}
            onChangeText={setKitTransmissao}
            placeholder="Kit de Transmissão"
          />

          <Text style={styles.label}>Tamanho do Quadro:</Text>
          <TextInput
            style={styles.input}
            value={tamanhoQuadro}
            onChangeText={setTamanhoQuadro}
            placeholder="Tamanho do Quadro"
          />

          <Text style={styles.label}>Informações Adicionais:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={informacoesAdicionais}
            onChangeText={setInformacoesAdicionais}
            multiline
            placeholder="Informações Adicionais"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFB400', // Cor de fundo atualizada
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    backgroundColor: '#000', // Fundo preto para o Picker
    color: '#fff', // Texto branco
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default AdicionarBicicletaScreen;

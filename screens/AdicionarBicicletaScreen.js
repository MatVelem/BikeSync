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
  Picker,
  Dimensions
} from 'react-native';

const AdicionarBicicletaScreen = ({ navigation, route }) => {
  const {id_usuario} = route.params || {};
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

  const windowWidth = Dimensions.get('window').width;
  const contentWidth = Math.max(windowWidth, 600); // Força uma largura mínima para garantir rolagem horizontal

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
      id_usuario: id_usuario,
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
        const errorResponse = await response.json();
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
      <ScrollView 
        horizontal={true} 
        contentContainerStyle={[styles.scrollContainerHorizontal, { width: contentWidth }]}
      >
        <ScrollView vertical={true} contentContainerStyle={styles.scrollContainerVertical}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Adicionar Bicicleta</Text>
            
            <View style={styles.rowContainer}>
              <View style={styles.fieldContainer}>
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
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Modelo*:</Text>
                <TextInput
                  style={styles.input}
                  value={modelo}
                  onChangeText={setModelo}
                  placeholder="Modelo"
                />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Ano*:</Text>
                <TextInput
                  style={styles.input}
                  value={ano}
                  onChangeText={setAno}
                  keyboardType="numeric"
                  placeholder="Ano"
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tamanho da Roda*:</Text>
                <TextInput
                  style={styles.input}
                  value={tamanhoRoda}
                  onChangeText={setTamanhoRoda}
                  keyboardType="numeric"
                  placeholder="Tamanho da Roda"
                />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Serial*:</Text>
                <TextInput
                  style={styles.input}
                  value={serial}
                  onChangeText={setSerial}
                  placeholder="Serial"
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tipo:</Text>
                <TextInput
                  style={styles.input}
                  value={tipo}
                  onChangeText={setTipo}
                  placeholder="Tipo"
                />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Cor:</Text>
                <TextInput
                  style={styles.input}
                  value={cor}
                  onChangeText={setCor}
                  placeholder="Cor"
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Material:</Text>
                <TextInput
                  style={styles.input}
                  value={material}
                  onChangeText={setMaterial}
                  placeholder="Material"
                />
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Kit de Transmissão:</Text>
                <TextInput
                  style={styles.input}
                  value={kitTransmissao}
                  onChangeText={setKitTransmissao}
                  placeholder="Kit de Transmissão"
                />
              </View>
              
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Tamanho do Quadro:</Text>
                <TextInput
                  style={styles.input}
                  value={tamanhoQuadro}
                  onChangeText={setTamanhoQuadro}
                  placeholder="Tamanho do Quadro"
                />
              </View>
            </View>

            <Text style={styles.label}>Informações Adicionais:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={informacoesAdicionais}
              onChangeText={setInformacoesAdicionais}
              multiline
              placeholder="Informações Adicionais"
            />

            <Button 
              title="Adicionar Bicicleta" 
              onPress={handleAdicionarBicicleta} 
              color="#000" 
              style={styles.botaoAdicionar}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFB400',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainerHorizontal: {
    flexGrow: 1,
  },
  scrollContainerVertical: {
    paddingBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fieldContainer: {
    flex: 1,
    marginRight: 10,
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
    backgroundColor: '#000',
    color: '#fff',
    marginBottom: 15,
    height: 50,
  },
  textArea: {
    height: 100,
  },
  botaoAdicionar: {
    marginTop: 20,
    marginBottom: 20,
  }
});

export default AdicionarBicicletaScreen;
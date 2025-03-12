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
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const AdicionarBicicletaScreen = ({ navigation, route }) => {
  const {id_usuario, nome} = route.params || {};
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [marcaNome, setMarcaNome] = useState('Selecione uma marca');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [tamanhoRoda, setTamanhoRoda] = useState('');
  const [serial, setSerial] = useState('');
  const [tipo, setTipo] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('Selecione um tipo');
  const [cor, setCor] = useState('');
  const [material, setMaterial] = useState('');
  const [materialSelecionado, setMaterialSelecionado] = useState('Selecione um material');
  const [kitTransmissao, setKitTransmissao] = useState('');
  const [tamanhoQuadro, setTamanhoQuadro] = useState('');
  const [tamanhoQuadroSelecionado, setTamanhoQuadroSelecionado] = useState('Selecione um tamanho');
  const [informacoesAdicionais, setInformacoesAdicionais] = useState('');
  
  // Estados para controlar os modais de seleção
  const [showMarcaModal, setShowMarcaModal] = useState(false);
  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showTamanhoQuadroModal, setShowTamanhoQuadroModal] = useState(false);
  
  // Novo estado para controlar o modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(null);

  // Opções para os selects
  const tiposOptions = [
    { id: 1, nome: 'Mountain Bike' },
    { id: 2, nome: 'Road' },
    { id: 3, nome: 'Urbana' },
    { id: 4, nome: 'Híbrida' },
    { id: 5, nome: 'BMX' },
    { id: 6, nome: 'Gravel' },
    { id: 7, nome: 'Downhill' },
  ];

  const materiaisOptions = [
    { id: 1, nome: 'Alumínio' },
    { id: 2, nome: 'Carbono' },
    { id: 3, nome: 'Aço' },
    { id: 4, nome: 'Titânio' },
    { id: 5, nome: 'Cromoly' },
  ];

  const tamanhosQuadroOptions = [
    { id: 1, nome: 'XS' },
    { id: 2, nome: 'S' },
    { id: 3, nome: 'M' },
    { id: 4, nome: 'L' },
    { id: 5, nome: 'XL' },
    { id: 6, nome: 'XXL' },
  ];

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
    
    // Cleanup timer when component unmounts
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

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

    setIsSubmitting(true);

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

      setIsSubmitting(false);

      if (response.ok) {
        // Mostrar o modal de sucesso ao invés do Alert
        setShowSuccessModal(true);
        
        // Navegar automaticamente após 6 segundos
        const timer = setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('PrincipalUsuario', {
            nome: nome, // Use a variável nome que vem de route.params
            id_usuario: id_usuario
          });
        }, 6000);
        
        setRedirectTimer(timer);
      } else {
        const errorResponse = await response.json();
        Alert.alert('Erro', errorResponse.message || 'Não foi possível adicionar a bicicleta.');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Erro ao adicionar bicicleta:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar adicionar a bicicleta.');
    }
  };
  
  const handleContinuarClick = () => {
    // Limpar o timer de redirecionamento automático
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      setRedirectTimer(null);
    }
    
    // Fechar o modal e navegar para PrincipalUsuario com os parâmetros corretos
    setShowSuccessModal(false);
    navigation.navigate('PrincipalUsuario', {
    nome: nome, 
    id_usuario: id_usuario
  });
};

  // Funções para seleção de marca
  const handleSelectMarca = (item) => {
    setMarcaSelecionada(item.id_marca);
    setMarcaNome(item.nome_marca);
    setShowMarcaModal(false);
  };

  // Funções para seleção de tipo
  const handleSelectTipo = (item) => {
    setTipo(item.nome);
    setTipoSelecionado(item.nome);
    setShowTipoModal(false);
  };

  // Funções para seleção de material
  const handleSelectMaterial = (item) => {
    setMaterial(item.nome);
    setMaterialSelecionado(item.nome);
    setShowMaterialModal(false);
  };

  // Funções para seleção de tamanho de quadro
  const handleSelectTamanhoQuadro = (item) => {
    setTamanhoQuadro(item.nome);
    setTamanhoQuadroSelecionado(item.nome);
    setShowTamanhoQuadroModal(false);
  };

  // Componente para renderizar item da lista em modais
  const renderItem = ({ item, onSelect }) => (
    <TouchableOpacity 
      style={styles.modalItem} 
      onPress={() => onSelect(item)}
    >
      <Text style={styles.modalItemText}>{item.nome || item.nome_marca}</Text>
    </TouchableOpacity>
  );

  // Modal personalizado para seleção
  const SelectionModal = ({ visible, onClose, data, onSelect, title }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem({ item, onSelect })}
            keyExtractor={(item) => item.id?.toString() || item.id_marca?.toString()}
            style={styles.modalList}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Modal de sucesso personalizado
  const SuccessModal = ({ visible }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.successModalOverlay}>
        <View style={styles.successModalContent}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Bicicleta Adicionada!</Text>
          <Text style={styles.successMessage}>Sua bicicleta foi cadastrada com sucesso.</Text>
          <View style={styles.loadingContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.redirectingText}>Redirecionando em alguns segundos...</Text>
          </View>
          
          {/* Botão de continuar imediatamente */}
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinuarClick}
          >
            <Text style={styles.continueButtonText}>Continuar Agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Componente do campo de seleção personalizado
  const CustomSelect = ({ label, value, onPress, required }) => (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{label}{required && '*'}:</Text>
      <TouchableOpacity 
        style={styles.selectButton} 
        onPress={onPress}
      >
        <Text style={styles.selectText}>{value}</Text>
        <Text style={styles.selectIcon}>▼</Text>
      </TouchableOpacity>
    </View>
  );

  // Expo recomenda usar contentContainerStyle com paddingHorizontal para rolagem
  const formWidth = Math.max(width, 800); // Forçando uma largura mínima de 800px

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ width: formWidth, paddingHorizontal: 20 }}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
      >
        <ScrollView 
          contentContainerStyle={styles.innerScrollView}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.titulo}>Adicionar Bicicleta</Text>
          
          <View style={styles.formContainer}>
            <View style={styles.row}>
              <View style={styles.column}>
                <CustomSelect 
                  label="Marca" 
                  value={marcaNome} 
                  onPress={() => setShowMarcaModal(true)}
                  required={true}
                />
              </View>
              
              <View style={styles.column}>
                <Text style={styles.label}>Modelo*:</Text>
                <TextInput
                  style={styles.input}
                  value={modelo}
                  onChangeText={setModelo}
                  placeholder="Modelo"
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Ano*:</Text>
                <TextInput
                  style={styles.input}
                  value={ano}
                  onChangeText={setAno}
                  keyboardType="numeric"
                  placeholder="Ano"
                />
              </View>
              
              <View style={styles.column}>
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
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Serial*:</Text>
                <TextInput
                  style={styles.input}
                  value={serial}
                  onChangeText={setSerial}
                  placeholder="Serial"
                />
              </View>
              
              <View style={styles.column}>
                <CustomSelect 
                  label="Tipo" 
                  value={tipoSelecionado} 
                  onPress={() => setShowTipoModal(true)}
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Cor:</Text>
                <TextInput
                  style={styles.input}
                  value={cor}
                  onChangeText={setCor}
                  placeholder="Cor"
                />
              </View>
              
              <View style={styles.column}>
                <CustomSelect 
                  label="Material" 
                  value={materialSelecionado} 
                  onPress={() => setShowMaterialModal(true)}
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Kit de Transmissão:</Text>
                <TextInput
                  style={styles.input}
                  value={kitTransmissao}
                  onChangeText={setKitTransmissao}
                  placeholder="Kit de Transmissão"
                />
              </View>
              
              <View style={styles.column}>
                <CustomSelect 
                  label="Tamanho do Quadro" 
                  value={tamanhoQuadroSelecionado} 
                  onPress={() => setShowTamanhoQuadroModal(true)}
                />
              </View>
            </View>
            
            <View style={styles.fullWidthField}>
              <Text style={styles.label}>Informações Adicionais:</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={informacoesAdicionais}
                onChangeText={setInformacoesAdicionais}
                multiline
                placeholder="Informações Adicionais"
              />
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAdicionarBicicleta}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Adicionar Bicicleta</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Modais de Seleção */}
          <SelectionModal
            visible={showMarcaModal}
            onClose={() => setShowMarcaModal(false)}
            data={marcas}
            onSelect={handleSelectMarca}
            title="Selecione uma Marca"
          />
          
          <SelectionModal
            visible={showTipoModal}
            onClose={() => setShowTipoModal(false)}
            data={tiposOptions}
            onSelect={handleSelectTipo}
            title="Selecione um Tipo"
          />
          
          <SelectionModal
            visible={showMaterialModal}
            onClose={() => setShowMaterialModal(false)}
            data={materiaisOptions}
            onSelect={handleSelectMaterial}
            title="Selecione um Material"
          />
          
          <SelectionModal
            visible={showTamanhoQuadroModal}
            onClose={() => setShowTamanhoQuadroModal(false)}
            data={tamanhosQuadroOptions}
            onSelect={handleSelectTamanhoQuadro}
            title="Selecione um Tamanho"
          />
          
          {/* Modal de Sucesso */}
          <SuccessModal visible={showSuccessModal} />
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB400',
  },
  innerScrollView: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  fullWidthField: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 15,
    paddingHorizontal: 5,
  },
  // Estilos para o campo de seleção customizado
  selectContainer: {
    marginBottom: 5,
  },
  selectButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: '#333',
    fontSize: 14,
  },
  selectIcon: {
    fontSize: 16,
    color: '#333',
  },
  // Estilos para o modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  // Estilo para o botão de envio
  submitButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Estilos para o modal de sucesso
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Adicionado margem para separar do botão
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFB400',
    borderRadius: 3,
    animation: 'fill 6s linear forwards',
  },
  redirectingText: {
    fontSize: 14,
    color: '#888',
  },
  // Estilo para o botão de continuar imediatamente
  continueButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
}); 

// Adicione isto para criar a animação da barra de progresso
if (Platform.OS === 'web') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fill {
      0% { width: 0%; }
      100% { width: 100%; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default AdicionarBicicletaScreen;
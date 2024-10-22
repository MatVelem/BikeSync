import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../screens/Login'; // ajuste o caminho se necessário
import { NavigationContainer } from '@react-navigation/native';
import AdicionarBicicletaScreen from '../screens/AdicionarBicicletaScreen'; 
import { Alert } from 'react-native';

describe('Login Component', () => {
  it('renders correctly', () => {
    const mockRoute = {
      params: {
        tipoLogin: 'Usuario', // ou 'Lojista', conforme necessário
      },
    };

    const { getByPlaceholderText } = render(
      <NavigationContainer>
        <Login route={mockRoute} />
      </NavigationContainer>
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy(); // use o texto correto do seu placeholder
  });

  it('displays error message for invalid credentials', async () => {
    const mockRoute = {
      params: {
        tipoLogin: 'Usuario', // ou 'Lojista', conforme necessário
      },
    };

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Login route={mockRoute} />
      </NavigationContainer>
    );

    
  });
});

describe('Adicionar Bicicleta', () => {
  it('deve adicionar uma bicicleta com sucesso quando os dados válidos forem fornecidos', async () => {
    // Mock da função fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    const navigation = { navigate: jest.fn() };

    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <AdicionarBicicletaScreen navigation={navigation} />
      </NavigationContainer>
    );

    // Preencher os campos do formulário
    fireEvent.changeText(getByPlaceholderText('Marca:'), 'Marca Teste');
    fireEvent.changeText(getByPlaceholderText('Modelo:'), 'Modelo Teste');
    fireEvent.changeText(getByPlaceholderText('Ano:'), '2024');
    fireEvent.changeText(getByPlaceholderText('Tamanho da Roda:'), '26');
    fireEvent.changeText(getByPlaceholderText('Serial:'), '123456');
    fireEvent.changeText(getByPlaceholderText('Tipo:'), 'Mountain');
    fireEvent.changeText(getByPlaceholderText('Cor:'), 'Azul');
    fireEvent.changeText(getByPlaceholderText('Material:'), 'Alumínio');
    fireEvent.changeText(getByPlaceholderText('Kit de Transmissão:'), 'Shimano');
    fireEvent.changeText(getByPlaceholderText('Tamanho do Quadro:'), 'M');
    fireEvent.changeText(getByPlaceholderText('Informações Adicionais:'), 'Bicicleta nova.');

    // Simula o clique no botão "Adicionar Bicicleta"
    fireEvent.press(getByText('Adicionar Bicicleta'));

    // Verifica se o método de navegação foi chamado
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('MinhasBicicletas');
    });

    // Verifica se a função fetch foi chamada
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/bicicletas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marca: 'Marca Teste',
        modelo: 'Modelo Teste',
        ano: 2024,
        tamanho_roda: 26,
        serial: '123456',
        tipo: 'Mountain',
        cor: 'Azul',
        material: 'Alumínio',
        kit_transmissao: 'Shimano',
        tamanho_quadro: 'M',
        informacoes_adicionais: 'Bicicleta nova.',
        id_usuario: 1,
      }),
    });
  });

  
});

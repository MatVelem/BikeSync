import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';

const OrdensAceitas = ({ route, navigation }) => {
    const { id_ordem_servico } = route.params; // Receber o ID da ordem de serviço
    const [ordem, setOrdem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrdem();
    }, []);

    const fetchOrdem = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/ordens/${id_ordem_servico}`);
            setOrdem(response.data);
        } catch (err) {
            setError('Erro ao carregar os detalhes da ordem');
        } finally {
            setLoading(false);
        }
    };

    const aceitarOrdem = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/ordens/aceitar', {
                id_ordem_servico: ordem.id_ordem_servico,
                preco: ordem.valor, // Passa o valor da ordem
                data_servico: new Date().toISOString().split('T')[0],
                id_bicicleta: ordem.id_bicicleta,
                id_lojista: ordem.id_lojista,
                id_tipo_servico: ordem.id_tipo_servico,
            });

            Alert.alert('Sucesso', 'Ordem aceita com sucesso!');
            navigation.navigate('OrdensAceitas'); // Redireciona para a próxima tela
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao aceitar a ordem.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!ordem) {
        return <Text style={styles.errorText}>Nenhuma informação encontrada.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Ordem #{id_ordem_servico}</Text>
            <Text>Data: {ordem.data}</Text>
            <Text>Valor: R$ {ordem.valor}</Text>
            <Text>Forma de Pagamento: {ordem.forma_pagamento}</Text>
            <Text>Observações: {ordem.observacoes}</Text>
            <Button title="Aceitar Ordem" onPress={aceitarOrdem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OrdensAceitas;

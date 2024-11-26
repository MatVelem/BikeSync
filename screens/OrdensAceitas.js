import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';

const OrdensAceitas = () => {
    const [servicosPendentes, setServicosPendentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServicosPendentes();
    }, []);

    const fetchServicosPendentes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/servicos/pendentes');
            setServicosPendentes(response.data);
        } catch (err) {
            setError('Erro ao carregar os serviços pendentes');
        } finally {
            setLoading(false);
        }
    };

    const concluirServico = async (id_servico) => {
        try {
            console.log('ID do serviço:', id_servico);
            const response = await axios.post('http://localhost:3000/api/servicos/concluir', { id_servico });
            Alert.alert('Sucesso', response.data.message);
            // Atualiza a lista de serviços pendentes após concluir
            fetchServicosPendentes();
        } catch (error) {
            console.error('Erro ao concluir serviço:', error);
            Alert.alert('Erro', 'Não foi possível concluir o serviço.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ordens Aceitas - Pendentes</Text>
            {servicosPendentes.length > 0 ? (
                <FlatList
                    data={servicosPendentes}
                    keyExtractor={(item) => item.id_servico.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text>ID Serviço: {item.id_servico}</Text>
                            <Text>Modelo Bicicleta: {item.modelo_bicicleta}</Text>
                            <Text>Nome Lojista: {item.nome_lojista}</Text>
                            <Text>Tipo Serviço: {item.tipo_servico}</Text>
                            <Text>Preço: R$ {item.preco}</Text>
                            <Text>Data do Serviço: {item.data_servico}</Text>
                            <Button
                                title="Concluir"
                                color="#28a745"
                                onPress={() => concluirServico(item.id_servico)}
                            />
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noOrders}>Nenhuma ordem pendente.</Text>
            )}
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
    card: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noOrders: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OrdensAceitas;

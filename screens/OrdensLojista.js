import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const OrdensLojista = ({ route, navigation }) => {
    const { id_lojista } = route.params; // Receber id_lojista
    const [ordens, setOrdens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrdens();
    }, []);

    const fetchOrdens = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/ordens/pendentes/${id_lojista}`);
            setOrdens(response.data);
        } catch (err) {
            setError('Erro ao carregar ordens');
        } finally {
            setLoading(false);
        }
    };

   

    const rejeitarOrdem = async (id_ordem_servico) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/ordens/rejeitar`, {
                params: { id_ordem_servico },
            });
            if (response.status === 200) {
                fetchOrdens(); // Atualiza a lista de ordens pendentes
            } else {
                setError('Erro ao rejeitar ordem');
            }
        } catch (err) {
            setError('Erro ao rejeitar ordem');
        }
    };

    const renderOrdem = ({ item }) => (
        <View style={styles.ordemItem}>
            <Text style={styles.ordemText}>Ordem: #{item.id_ordem_servico}</Text>
            <Text style={styles.ordemText}>Bicicleta: {item.bicicleta_nome}</Text>
            <Text style={styles.ordemText}>Usuário: {item.usuario_nome}</Text>
            <Text style={styles.ordemText}>Valor: R$ {item.valor}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.aceitarButton}
                    onPress={() => aceitarOrdem(item.id_ordem_servico)}
                >
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rejeitarButton}
                    onPress={() => rejeitarOrdem(item.id_ordem_servico)}
                >
                    <Text style={styles.buttonText}>Rejeitar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={ordens}
                renderItem={renderOrdem}
                keyExtractor={(item) => item.id_ordem_servico.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFB400',
        padding: 20,
    },
    ordemItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
    },
    ordemText: {
        fontSize: 16,
        color: '#000',
    },
    aceitarButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    rejeitarButton: {
        marginTop: 10,
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default OrdensLojista;

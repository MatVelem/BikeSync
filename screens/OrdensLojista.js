import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';

const OrdensLojista = ({ route, navigation }) => {
    const { id_lojista } = route.params;
    const [ordens, setOrdens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [acceptedModalVisible, setAcceptedModalVisible] = useState(false);
    const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({ id: null, nome: '' });
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

    useEffect(() => {
        fetchOrdens();
    }, []);

    const fetchOrdens = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/ordens/pendentes/${id_lojista}`);
            const data = await response.json();
            setOrdens(data);
        } catch (err) {
            setError('Erro ao carregar ordens');
        } finally {
            setLoading(false);
        }
    };

    const aceitarOrdem = async (id_ordem_servico, preco, id_bicicleta, id_tipo_servico, usuario_nome) => {
        try {
            const response = await fetch('http://localhost:3000/api/servicos/aceitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_ordem_servico,
                    preco,
                    data_servico: new Date().toISOString(),
                    id_bicicleta,
                    id_lojista,
                    id_tipo_servico,
                }),
            });

            if (response.status === 200) {
                fetchOrdens(); // Atualiza a lista de ordens pendentes
                setSelectedOrder({ id: id_ordem_servico, nome: usuario_nome });
                setAcceptedModalVisible(true);
            } else {
                setError('Erro ao aceitar ordem');
            }
        } catch (err) {
            setError('Erro ao aceitar ordem');
        }
    };

    const rejeitarOrdem = (id_ordem_servico, usuario_nome) => {
        setSelectedOrder({ id: id_ordem_servico, nome: usuario_nome });
        setConfirmationModalVisible(true);
    };

    const confirmarRejeitarOrdem = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/ordens/rejeitar?id_ordem_servico=${selectedOrder.id}`, {
                method: 'GET',
            });
            if (response.status === 200) {
                fetchOrdens(); // Atualiza a lista de ordens pendentes
                setConfirmationModalVisible(false);
                setRejectionModalVisible(true);
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
                    onPress={() =>
                        aceitarOrdem(
                            item.id_ordem_servico,
                            item.valor,
                            item.id_bicicleta,
                            item.id_tipo_servico,
                            item.usuario_nome
                        )
                    }
                >
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rejeitarButton}
                    onPress={() => rejeitarOrdem(item.id_ordem_servico, item.usuario_nome)}
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

            {/* Modal de Confirmação de Aceitação */}
            <Modal
                transparent={true}
                visible={acceptedModalVisible}
                animationType="slide"
                onRequestClose={() => setAcceptedModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Pedido Aceito</Text>
                        <Text style={styles.modalMessage}>O pedido de ID {selectedOrder.id} do usuário {selectedOrder.nome} foi aceito com sucesso.</Text>
                        <TouchableOpacity onPress={() => setAcceptedModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Confirmação de Rejeição */}
            <Modal
                transparent={true}
                visible={rejectionModalVisible}
                animationType="slide"
                onRequestClose={() => setRejectionModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Pedido Rejeitado</Text>
                        <Text style={styles.modalMessage}>O pedido de ID {selectedOrder.id} do usuário {selectedOrder.nome} foi cancelado com sucesso.</Text>
                        <TouchableOpacity onPress={() => setRejectionModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Confirmação */}
            <Modal
                transparent={true}
                visible={confirmationModalVisible}
                animationType="slide"
                onRequestClose={() => setConfirmationModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirmar Rejeição</Text>
                        <Text style={styles.modalMessage}>Tem certeza que quer rejeitar o pedido de ID {selectedOrder.id} do usuário {selectedOrder.nome}?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={confirmarRejeitarOrdem} style={styles.confirmButton}>
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setConfirmationModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default OrdensLojista;

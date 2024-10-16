import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Principal() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Entrou</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8b703', // Manter a mesma cor de fundo do login
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});

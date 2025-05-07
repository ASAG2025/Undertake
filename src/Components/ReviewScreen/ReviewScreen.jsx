import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './ReviewScreen';

export default function ReviewsScreen() {
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        const fetchedReviews = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setReviews(fetchedReviews);
    };

    const handleSubmit = async () => {
        if (user && comment && rating) {
            await addDoc(collection(db, 'reviews'), {
                user,
                comment,
                rating: Number(rating),
                createdAt: serverTimestamp()
            });
            setUser('');
            setComment('');
            setRating('');
            fetchReviews(); // Recargar las reseñas
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Deja tu Reseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                style={styles.input}
                placeholder="Comentario"
                value={comment}
                onChangeText={setComment}
            />
            <TextInput
                style={styles.input}
                placeholder="Calificación (1-5)"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
            />
            <Button title="Enviar Reseña" onPress={handleSubmit} />

            <Text style={styles.subtitle}>Reseñas:</Text>
            <FlatList
                data={reviews}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <Text style={styles.user}>{item.user}</Text>
                        <Text>⭐ {item.rating}</Text>
                        <Text>{item.comment}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 30 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 8 },
    reviewCard: { padding: 15, backgroundColor: '#f9f9f9', marginVertical: 5, borderRadius: 8 },
    user: { fontWeight: 'bold' }
});

export function ReviewScreen() {
    return (
        <View>
            <Text>Pantalla de reseñas</Text>
        </View>
    );
}


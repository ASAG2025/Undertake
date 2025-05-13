import { db } from "../../Database/FirebaseConfig";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

// 🔹 Obtener talleres con ID incluido
export const obtenerTalleres = async () => {
    const snapshot = await getDocs(collection(db, "talleres"));
    return snapshot.docs.map((doc) => ({
        id: doc.id,       // ✅ Incluye el ID del documento
        ...doc.data()
    }));
};

// 🔹 Guardar reseña
export const guardarReseña = async (tallerId, comentario) => {
    if (!tallerId || !comentario || comentario.trim() === "") {
        throw new Error("Faltan parámetros necesarios o el comentario está vacío.");
    }

    const docRef = doc(db, "talleres", tallerId);
    const nuevaReseña = { comentario };

    try {
        await updateDoc(docRef, {
            reseñas: arrayUnion(nuevaReseña),
        });
    } catch (error) {
        console.error("Error al guardar la reseña:", error);
        throw new Error("Hubo un problema al guardar el comentario.");
    }
};

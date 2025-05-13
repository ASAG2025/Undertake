import "./CardTaller.css";
import { useState } from "react";
import { FaTag, FaFilePdf, FaCommentDots } from "react-icons/fa";
import { guardarReseña } from "./talleresServices.jsx";

/**
 * Extrae el ID del video de una URL de YouTube.
 * Soporta links como:
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/watch?v=VIDEO_ID
 */
const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const coloresTags = {
    "Marketing en Redes": "#4CAF50",
};

const CardTaller = ({ id, titulo, imagen, tags = [], descripcion, formato, video }) => {
    const [comentario, setComentario] = useState("");
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const videoId = video ? extractVideoId(video) : null;

    const handleGuardarComentario = async () => {
        if (!comentario.trim()) {
            setMensaje("Por favor, escribe un comentario.");
            return;
        }

        if (!id) {
            setMensaje("ID del taller no disponible.");
            return;
        }

        setGuardando(true);
        try {
            await guardarReseña(id, comentario);
            setMensaje("¡Comentario guardado!");
            setComentario("");
        } catch (error) {
            console.error(error);
            setMensaje("Error al guardar el comentario.");
        }
        setGuardando(false);
        setTimeout(() => setMensaje(""), 3000);
    };

    return (
        <div className="card-bosquejo">
            <img src={imagen} alt={titulo} className="card-img" />

            <div className="card-content">
                <h3 className="card-title">{titulo}</h3>
                <p className="card-descripcion">{descripcion}</p>

                {videoId && (
                    <div className="card-video">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`}
                            title="Video"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {formato && (
                    <div className="card-formato">
                        <FaFilePdf className="icon-formato" /> {formato}
                    </div>
                )}

                <div className="card-tags-wrapper">
                    <p className="card-tags-title">Temas:</p>
                    <div className="card-tags">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="tag"
                                style={{ backgroundColor: coloresTags[tag] || "#607d8b" }}
                            >
                                <FaTag /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Comentarios y reseñas */}
                <div className="card-comentario">
                    <p className="card-tags-title"><FaCommentDots /> Tu reseña:</p>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe tu comentario sobre el taller..."
                        rows={3}
                        className="comentario-textarea"
                    ></textarea>
                    <button
                        onClick={handleGuardarComentario}
                        disabled={guardando}
                        className="btn-guardar-reseña"
                    >
                        {guardando ? "Guardando..." : "Guardar reseña"}
                    </button>
                    {mensaje && <p className="mensaje-reseña">{mensaje}</p>}
                </div>
            </div>
        </div>
    );
};

export default CardTaller;

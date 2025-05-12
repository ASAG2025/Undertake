import "./CardTaller.css";
import { FaTag, FaFilePdf } from "react-icons/fa";

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
    "Finanzas": "#4CAF50",
};

const CardTaller = ({ titulo, imagen, tags = [], descripcion, formato, video }) => {
    const videoId = video ? extractVideoId(video) : null;

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
            </div>
        </div>
    );
};

export default CardTaller;

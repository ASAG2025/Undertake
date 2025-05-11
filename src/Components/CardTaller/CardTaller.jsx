import "./CardTaller.css";
import { FaBook, FaTag, FaFilePdf } from "react-icons/fa";npm

const coloresTags = {
    "Finanzas": "#4CAF50",
};


const CardTaller = ({ titulo, imagen, tags = [], descripcion, formato, link }) => {
    return (
        <div className="card-bosquejo">
            <img src={imagen} alt={titulo} className="card-img" />
            <div className="card-content">
                <h3 className="card-title">{titulo}</h3>
                <p className="card-descripcion">{descripcion}</p>
                <div className="card-meta">
                    {formato && (
                        <div className="card-formato">
                            <FaFilePdf className="icon-formato" /> {formato}
                        </div>
                    )}
                    {link && (
                        <div className="card-link">
                            <span className="card-link-title">Leer aquí:</span>{" "}
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {link.replace(/^https?:\/\//, "").split("/")[0]} →
                            </a>
                        </div>
                    )}
                </div>
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

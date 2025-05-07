import { useEffect, useState } from "react";
import CardTaller from "../../components/CardTaller/CardTaller";
import { obtenerTalleres } from "../../services/talleresServices";
import "./TallerPage.css";

const TallerPage = () => {
    const [talleres, setTalleres] = useState([]);

    useEffect(() => {
        obtenerTalleres()
            .then(setTalleres)
            .catch(console.error);
    }, []);

    return (
        <div className="home-container">
            {talleres.map(b => (
                <CardTaller
                    key={b.id}
                    titulo={b.titulo}
                    imagen={b.imagen}
                    tags={b.tags}
                    descripcion={b.descripcion}
                    formato={b.formato}
                    link={b.link}
                />
            ))}
        </div>
    );
};

export default TallerPage;

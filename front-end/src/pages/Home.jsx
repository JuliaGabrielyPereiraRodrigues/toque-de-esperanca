import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [campanhas, setCampanhas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await fetch("http://localhost:3000/campanhas");
        if (!response.ok) throw new Error("Erro ao buscar campanhas");
        const data = await response.json();
        setCampanhas(data.reverse()); 
      } catch {
        setErro("Erro ao carregar campanhas.");
      }
    };

    fetchCampanhas();
  }, []);

  return (
    <section>
      <div className="container-cards">
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {campanhas.length === 0 && !erro && <p>Sem campanhas ainda.</p>}

        {campanhas.map((campanha) => (
          <div key={campanha._id} className="card-campanha">
            {campanha.status === "concluida" && (
              <span className="selo-concluida">✅ Concluída</span>
            )}
            <img
              src={`http://localhost:3000/uploads/${campanha.imagem}`}
              alt={campanha.titulo}
              className="imagem-campanha"
            />
            <h3>{campanha.titulo}</h3>
            <p>{campanha.descricao.slice(0, 100)}...</p>
            <Link to={`/campanha/${campanha._id}`} className="btn-ver-detalhes">
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;

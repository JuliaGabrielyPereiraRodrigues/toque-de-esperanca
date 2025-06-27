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

  const campanhasPedido = campanhas.filter(c => c.tipoCadastro === "pedido");
  const campanhasDoacao = campanhas.filter(c => c.tipoCadastro === "doacao");

  const renderCarrossel = (lista, titulo) => (
    <div className="carrossel-bloco">
      <h2 className="carrossel-titulo">{titulo}</h2>
      <div className="carrossel-container">
        {lista.length === 0 ? (
          <p className="aviso">Nenhuma campanha disponível.</p>
        ) : (
          lista.map(campanha => (
            <div key={campanha._id} className="card-campanha">
              <div className="card-imagem-container">
                {campanha.status === "concluida" && (
                  <span className="selo-concluida">✅ Concluída</span>
                )}
                <img
                  src={`http://localhost:3000/uploads/${campanha.imagem}`}
                  alt={campanha.titulo}
                  className="card-imagem"
                />
              </div>
              <div className="card-texto">
                <h3 className="card-titulo">{campanha.titulo}</h3>
                <p className="card-sobre">{campanha.descricao.slice(0, 100)}...</p>
                <Link to={`/campanha/${campanha._id}`} className="btn-ver-detalhes">
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <section className="home-section">
      {erro && <p className="erro-home">{erro}</p>}
      {!erro && (
        <>
          {renderCarrossel(campanhasPedido, "Campanhas que precisam de ajuda")}
          {renderCarrossel(campanhasDoacao, "Campanhas de doações")}
        </>
      )}
    </section>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Não define erro, só não tenta carregar perfil
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          setErro(data.message || "Erro ao carregar perfil");
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        setErro("Erro na comunicação com o servidor.");
      }
    };

    fetchPerfil();
  }, []);

  return (
    <section>
      <div className="user-info">
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {/* Se tem token mas ainda não carregou user, mostra 'Carregando perfil...' */}
        {!erro && !user && localStorage.getItem("token") && <p>Carregando perfil...</p>}
        {/* Se não tem token, não mostra nada aqui */}
      </div>

      <div className="container-cards">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </section>
  );
};

export default Home;

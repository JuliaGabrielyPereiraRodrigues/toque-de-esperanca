import React from "react";
import "./Item.css"; 

const Item = () => {
  return (
    <div className="card-campanha">
      <img
        src="https://th.bing.com/th/id/OIP.TI6CVKIZ_BWRKacy3-3djAHaGN?w=195&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
        alt="Imagem da campanha"
        className="card-imagem"
      />
      <div className="card-texto">
        <h3 className="card-titulo">Campanha: Família Silva</h3>
        <p className="card-sobre">
          Família precisando de alimentos e roupas devido a enchentes.
        </p>
      </div>
    </div>
  );
};

export default Item;

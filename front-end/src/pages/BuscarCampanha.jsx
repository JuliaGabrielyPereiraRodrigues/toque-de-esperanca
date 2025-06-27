import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuscarCampanha.css';

const tiposCadastro = [
  { label: 'Preciso de ajuda', value: 'pedido' },
  { label: 'Quero doar', value: 'doacao' },
];

const tiposCampanha = ['Alimento', 'Roupa', 'Brinquedo', 'Dinheiro', 'Outro'];

const BuscarCampanha = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipoCadastro, setFilterTipoCadastro] = useState('');
  const [filterTipoCampanha, setFilterTipoCampanha] = useState('');
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buscou, setBuscou] = useState(false);

  const navigate = useNavigate(); 

  const fetchCampanhas = async () => {
    setLoading(true);
    setError('');
    setBuscou(true);

    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (filterTipoCadastro) queryParams.append('tipoCadastro', filterTipoCadastro);
      if (filterTipoCampanha) queryParams.append('tipo', filterTipoCampanha);

      const response = await fetch(`http://localhost:3000/campanhas?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Erro ao buscar campanhas.');
      const data = await response.json();
      setCampanhas(data || []);
    } catch (err) {
      setError(err.message || 'Erro na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCampanhas();
  };

  return (
    <section className="buscar-campanha-container">
      <h2>Buscar Campanhas</h2>

      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="searchTerm">Pesquisar por Título/Descrição/Local:</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ex: Alimentos para famílias carentes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="filterTipoCadastro">Tipo de Cadastro:</label>
          <select
            id="filterTipoCadastro"
            value={filterTipoCadastro}
            onChange={(e) => setFilterTipoCadastro(e.target.value)}
          >
            <option value="">Todos</option>
            {tiposCadastro.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="filterTipoCampanha">Tipo de Campanha:</label>
          <select
            id="filterTipoCampanha"
            value={filterTipoCampanha}
            onChange={(e) => setFilterTipoCampanha(e.target.value)}
          >
            <option value="">Todos</option>
            {tiposCampanha.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-search-campanha">
          Buscar
        </button>
      </form>

      {loading && <p>Carregando campanhas...</p>}
      {error && <p className="error-message">{error}</p>}

      {buscou && (
        <div className="campanhas-results-grid">
          {campanhas.length > 0 ? (
            campanhas.map((campanha) => (
              <div
                key={campanha._id}
                className="card-campanha"
                onClick={() => navigate(`/campanha/${campanha._id}`)}
                style={{ cursor: "pointer" }} 
              >
                {campanha.status === "concluida" && (
                  <span className="selo-concluida">✅ Concluída</span>
                )}
                <img
                  src={`http://localhost:3000/uploads/${campanha.imagem}`}
                  alt={campanha.titulo}
                  className="card-imagem"
                />
                <div className="card-texto">
                  <h3 className="card-titulo">{campanha.titulo}</h3>
                  <p className="card-sobre">{campanha.descricao?.slice(0, 100)}...</p>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p>Nenhuma campanha encontrada.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default BuscarCampanha;

import { useState } from 'react';
import { FILMES } from '../data/filmes';
import CartaoFilme from '../components/CartaoFilme';

function Home() {
  const [busca, setBusca] = useState('');

  const filmesFiltrados = FILMES.filter((filme) =>
    filme.titulo
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <div className="pagina-home">
      <h1>Filmes</h1>

      <input
        type="text"
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
        placeholder="🔍 Buscar filme..."
        className="campo-busca"
      />

      <div className="grid-filmes">
        {filmesFiltrados.map((filme) => (
          <CartaoFilme
            key={filme.id}
            filme={filme}
          />
        ))}
      </div>

      <p className="contagem">
        {filmesFiltrados.length} filme(s)
        encontrado(s)
      </p>
    </div>
  );
}

export default Home;
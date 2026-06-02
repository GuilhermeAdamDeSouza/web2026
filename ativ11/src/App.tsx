import { useState, useMemo, useCallback } from 'react';
import { useFetch, useDebounce } from './hooks/index';
import Header from './components/Header';
import BarraBusca from './components/BarraBusca';
import BotoesStatus from './components/BotoesStatus';
import Paginacao from './components/Paginacao';
import ListaMeusFavoritos from './components/ListaMeusFavoritos';
import CartaoPersonagem from './components/CartaoPersonagem';
import './App.css';

type FiltroStatus = 'all' | 'alive' | 'dead' | 'unknown';

type Personagem = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  [key: string]: unknown;
};

type RespostaAPI = {
  info: { count: number; pages: number };
  results: Personagem[];
};

function App() {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('all');
  const [abaMeusFavoritos, setAbaMeusFavoritos] = useState(false);

  const buscaDebounced = useDebounce(busca, 400);

  const url = `https://rickandmortyapi.com/api/character?page=${pagina}${
    filtroStatus !== 'all' ? `&status=${filtroStatus}` : ''
  }`;

  const { dados, loading, erro } = useFetch<RespostaAPI>(url);

  const personagensFiltrados = useMemo(
    () =>
      dados?.results.filter((p) =>
        p.name.toLowerCase().includes(buscaDebounced.toLowerCase())
      ) || [],
    [dados, buscaDebounced]
  );

  const handleFiltroChange = useCallback((novoFiltro: FiltroStatus) => {
    setFiltroStatus(novoFiltro);
    setPagina(1);
  }, []);

  return (
    <div className="app app-claro">
      <Header totalPersonagens={dados?.info.count ?? null} />

      <div className="controles">
        <BarraBusca valor={busca} onChange={setBusca} />
        <BotoesStatus filtroStatus={filtroStatus} onFiltroChange={handleFiltroChange} />
      </div>

      <div className="abas">
        <button
          className={`aba ${!abaMeusFavoritos ? 'ativo' : ''}`}
          onClick={() => setAbaMeusFavoritos(false)}
        >
          Todos
        </button>
        <button
          className={`aba ${abaMeusFavoritos ? 'ativo' : ''}`}
          onClick={() => setAbaMeusFavoritos(true)}
        >
          Meus Favoritos
        </button>
      </div>

      {!abaMeusFavoritos && (
        <>
          {loading && <div className="mensagem">⏳ Carregando...</div>}
          {erro && <div className="mensagem erro">❌ Erro: {erro}</div>}
          {!loading && personagensFiltrados.length > 0 && (
            <>
              <div className="personagens-grid">
                {personagensFiltrados.map((p) => (
                  <CartaoPersonagem key={p.id} personagem={p} />
                ))}
              </div>
              <Paginacao
                paginaAtual={pagina}
                totalPaginas={dados?.info.pages ?? 1}
                onProxima={() => setPagina((p) => p + 1)}
                onAnterior={() => setPagina((p) => p - 1)}
              />
            </>
          )}
        </>
      )}

      <ListaMeusFavoritos ativo={abaMeusFavoritos} />
    </div>
  );
}

export default App;
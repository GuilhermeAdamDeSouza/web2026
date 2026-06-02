import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import CartaoPersonagem from './components/CartaoPersonagem';
import type { Personagem, ApiInfo, RespostaAPI, FiltroStatus } from './types/rickandmorty';
import './App.css';

function App() {

  const [personagens, setPersonagens] = useState<Personagem[]>([]);
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('all');
  const [personagemSelecionado, setPersonagemSelecionado] = useState<Personagem | null>(null);

  useEffect(() => {
    buscarPersonagens();
  }, [pagina, filtroStatus]);

  async function buscarPersonagens(): Promise<void> {
    setLoading(true);
    setErro(null);

    try {
      const url = new URL('https://rickandmortyapi.com/api/character');
      url.searchParams.set('page', String(pagina));
      if (filtroStatus !== 'all') {
        url.searchParams.set('status', filtroStatus);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Não foi possível carregar os personagens.');
      }

      const data = (await response.json()) as RespostaAPI;
      setPersonagens(data.results);
      setInfo(data.info);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      setErro(message);
      setPersonagens([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }


  const personagensFiltrados: Personagem[] = personagens.filter((personagem) =>
    personagem.name.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🧬 Painel de Personagens</h1>
          <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
        </div>
        <div className="contador">
          {info ? `${info.count} personagens` : '—'}
        </div>
      </header>

      <div className="controles">
        <input
          type="text"
          className="campo-busca"
          placeholder="🔍 Buscar por nome..."
          value={busca}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setBusca(event.target.value)}
        />

        <div className="filtros">
          {(['all', 'alive', 'dead', 'unknown'] as FiltroStatus[]).map((s) => (
            <button
              key={s}
              className={`btn-filtro ${filtroStatus === s ? 'ativo' : ''}`}
              onClick={() => {
                setFiltroStatus(s);
                setPagina(1);
              }}
            >
              {s === 'all' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="status loading">⏳ Carregando personagens...</p>}
      {erro && <p className="status erro">❌ {erro}</p>}

      {!loading && !erro && (
        <div className="grid">
          {personagensFiltrados.length > 0 ? (
            personagensFiltrados.map((p) => (
              <CartaoPersonagem
                key={p.id}
                personagem={p}
                onClick={() => setPersonagemSelecionado(p)}
              />
            ))
          ) : (
            <p className="vazio">Nenhum personagem encontrado.</p>
          )}
        </div>
      )}

      {personagemSelecionado && (
        <section className="selected-card">
          <h2>Personagem selecionado</h2>
          <p><strong>Nome:</strong> {personagemSelecionado.name}</p>
          <p><strong>Status:</strong> {personagemSelecionado.status}</p>
          <p><strong>Espécie:</strong> {personagemSelecionado.species}</p>
        </section>
      )}

      {info && !loading && (
        <div className="paginacao">
          <span className="pag-info">
            {info.count} personagens · Página {pagina} de {info.pages}
          </span>
          <div className="pag-botoes">
            <button
              className="btn-pag"
              disabled={!info.prev}
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
            >
              ← Anterior
            </button>
            <button
              className={`btn-pag ${info.next ? 'proximo' : ''}`}
              disabled={!info.next}
              onClick={() => setPagina((p) => p + 1)}
            >
              Próxima →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

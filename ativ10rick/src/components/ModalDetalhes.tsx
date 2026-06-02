import { useState, useEffect } from 'react';
import type { Personagem } from '../types/rickandmorty';
import './ModalDetalhes.css';

interface Props {
  personagem: Personagem;
  onFechar: () => void;
}

function ModalDetalhes({ personagem, onFechar }: Props) {
  const [detalhes, setDetalhes] = useState<Personagem | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarDetalhes();
  }, [personagem.id]);

  async function buscarDetalhes(): Promise<void> {
    setCarregando(true);
    setErro(null);

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${personagem.id}`);
      if (!response.ok) {
        throw new Error('Não foi possível carregar os detalhes.');
      }

      const data = (await response.json()) as Personagem;
      setDetalhes(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      setErro(message);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <div className="modal-overlay" onClick={onFechar}>
        <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
          <p>⏳ Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="modal-overlay" onClick={onFechar}>
        <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
          <p>❌ {erro}</p>
          <button onClick={onFechar}>Fechar</button>
        </div>
      </div>
    );
  }

  if (!detalhes) return null;

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={onFechar}>✕</button>

        <div className="modal-grid">
          <img
            src={detalhes.image}
            alt={detalhes.name}
            className="modal-imagem"
          />

          <div className="modal-info">
            <h2>{detalhes.name}</h2>

            <div className="modal-secao">
              <h3>Status</h3>
              <p>{detalhes.status}</p>
            </div>

            <div className="modal-secao">
              <h3>Espécie</h3>
              <p>{detalhes.species}</p>
            </div>

            <div className="modal-secao">
              <h3>🏠 Localização</h3>
              <p>{detalhes.location.name}</p>
            </div>

            <div className="modal-secao">
              <h3>🌍 Origem</h3>
              <p>{detalhes.origin.name}</p>
            </div>

            <div className="modal-secao">
              <h3>📺 Episódios ({detalhes.episode.length})</h3>
              <div className="modal-episodios">
                {detalhes.episode.slice(0, 10).map((ep, idx) => (
                  <span key={idx} className="episodio-badge">
                    Ep. {ep.split('/')[5]}
                  </span>
                ))}
                {detalhes.episode.length > 10 && (
                  <span className="episodio-mais">+{detalhes.episode.length - 10}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="modal-botao" onClick={onFechar}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalDetalhes;

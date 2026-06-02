import type { ApiInfo } from '../types/rickandmorty';

interface Props {
  info: ApiInfo | null;
  paginaAtual: number;
  onAnterior: () => void;
  onProxima: () => void;
  loading: boolean;
}

function Paginacao({ info, paginaAtual, onAnterior, onProxima, loading }: Props) {
  if (!info || loading) return null;

  return (
    <div className="paginacao">
      <span className="pag-info">
        {info.count} personagens · Página {paginaAtual} de {info.pages}
      </span>
      <div className="pag-botoes">
        <button
          className="btn-pag"
          disabled={!info.prev}
          onClick={onAnterior}
        >
          ← Anterior
        </button>
        <button
          className={`btn-pag ${info.next ? 'proximo' : ''}`}
          disabled={!info.next}
          onClick={onProxima}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

export default Paginacao;

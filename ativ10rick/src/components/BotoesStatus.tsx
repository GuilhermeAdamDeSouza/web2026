import type { FiltroStatus } from '../types/rickandmorty';

interface Props {
  filtroAtivo: FiltroStatus;
  onFiltroMudar: (filtro: FiltroStatus) => void;
}

function BotoesStatus({ filtroAtivo, onFiltroMudar }: Props) {
  return (
    <div className="filtros">
      {(['all', 'alive', 'dead', 'unknown'] as FiltroStatus[]).map((s) => (
        <button
          key={s}
          className={`btn-filtro ${filtroAtivo === s ? 'ativo' : ''}`}
          onClick={() => onFiltroMudar(s)}
        >
          {s === 'all' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default BotoesStatus;

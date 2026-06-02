import { memo, useCallback } from 'react';

// Tipo local para evitar dependência de arquivo externo ausente
export type FiltroStatus = 'all' | 'alive' | 'dead' | 'unknown';

interface BotoesStatusProps {
  filtroStatus: FiltroStatus;
  onFiltroChange: (filtro: FiltroStatus) => void;
}

const BotoesStatus = memo(function BotoesStatus({ filtroStatus, onFiltroChange }: BotoesStatusProps) {
  const handleClick = useCallback((status: FiltroStatus) => {
    onFiltroChange(status);
  }, [onFiltroChange]);

  return (
    <div className="filtros">
      {(['all', 'alive', 'dead', 'unknown'] as FiltroStatus[]).map((s) => (
        <button
          key={s}
          className={`btn-filtro ${filtroStatus === s ? 'ativo' : ''}`}
          onClick={() => handleClick(s)}
        >
          {s === 'all' ? 'Todos' : s === 'alive' ? 'Vivo' : s === 'dead' ? 'Morto' : 'Desconhecido'}
        </button>
      ))}
    </div>
  );
});

export default BotoesStatus;

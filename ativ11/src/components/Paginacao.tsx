interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onProxima: () => void;
  onAnterior: () => void;
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onProxima,
  onAnterior,
}: PaginacaoProps) {
  return (
    <div className="paginacao">
      <button onClick={onAnterior} disabled={paginaAtual === 1}>
        ← Anterior
      </button>
      <span className="info-pagina">
        Página {paginaAtual} de {totalPaginas}
      </span>
      <button onClick={onProxima} disabled={paginaAtual === totalPaginas}>
        Próxima →
      </button>
    </div>
  );
}

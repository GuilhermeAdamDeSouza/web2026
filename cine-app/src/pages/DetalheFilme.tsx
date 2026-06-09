import { useParams, useNavigate } from 'react-router-dom';
import { FILMES } from '../data/filmes';

function DetalheFilme() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const filme = FILMES.find(
    (f) => f.id === Number(id)
  );

  if (!filme) {
    return <p>Filme não encontrado.</p>;
  }

  return (
    <div className="pagina-detalhe">
      <button onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="detalhe-conteudo">
        <div className="detalhe-capa">
          🎞️
        </div>

        <div className="detalhe-info">
          <h1>{filme.titulo}</h1>

          <p>
            {filme.ano} · {filme.genero} ·{' '}
            {filme.duracao} min
          </p>

          <p className="sinopse">
            {filme.sinopse}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetalheFilme;
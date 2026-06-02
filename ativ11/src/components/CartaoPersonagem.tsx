import { memo } from 'react';
import { useFavoritos } from '../contexts/FavoritosContext';
// Local fallback type to avoid missing external type declaration
// Keep this file self-contained so TypeScript won't error if
// ../types/rickandmorty is not present.
interface Personagem {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | string;
  species: string;
  image: string;
}

interface Props {
  personagem: Personagem;
}

const CartaoPersonagem = memo(function CartaoPersonagem({ personagem }: Props) {
  const { isFavorito, toggleFavorito } = useFavoritos();
  const esFavorito = isFavorito(personagem.id);

  const classeBadge =
    personagem.status === 'Alive'
      ? 'badge-alive'
      : personagem.status === 'Dead'
        ? 'badge-dead'
        : 'badge-unknown';

  return (
    <div className={`card ${esFavorito ? 'card-favorito' : ''}`}>
      <img src={personagem.image} alt={personagem.name} className="card-img" />
      <div className="card-body">
        <h2 className="card-nome">{personagem.name}</h2>
        <p className="card-especie">{personagem.species}</p>
        <span className={`badge ${classeBadge}`}>{personagem.status}</span>
        <button
          className="btn-favoritar"
          onClick={() => toggleFavorito(personagem.id)}
          title={esFavorito ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
});

export default CartaoPersonagem;
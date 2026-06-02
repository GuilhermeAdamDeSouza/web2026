import { useFavoritos } from '../contexts/FavoritosContext';
import { useFetch } from '../hooks/userFetch';
// Tipos locais para evitar erro de importação de módulo externo
type Personagem = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type RespostaAPI = {
  error?: string;
};
import CartaoPersonagem from './CartaoPersonagem';

interface ListaMeusFavoritosProps {
  ativo: boolean;
}

export default function ListaMeusFavoritos({ ativo }: ListaMeusFavoritosProps) {
  const { favoritos } = useFavoritos();

  // Construir URL com múltiplos IDs
  const url =
    favoritos.length > 0
      ? `https://rickandmortyapi.com/api/character/${favoritos.join(',')}`
      : '';

  const { dados, loading, erro } = useFetch<Personagem[] | RespostaAPI>(url);

  if (!ativo) return null;

  if (loading) {
    return <div className="mensagem">Carregando favoritos...</div>;
  }

  if (erro) {
    return <div className="mensagem erro">Erro ao carregar favoritos: {erro}</div>;
  }

  if (favoritos.length === 0) {
    return <div className="mensagem">Nenhum favorito adicionado ainda 🤷</div>;
  }

  const personagens = Array.isArray(dados) ? dados : [];

  return (
    <div className="personagens-grid">
      {personagens.map((personagem) => (
        <CartaoPersonagem key={personagem.id} personagem={personagem} />
      ))}
    </div>
  );
}

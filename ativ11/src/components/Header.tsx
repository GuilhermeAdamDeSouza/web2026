import { useFavoritos } from '../contexts/FavoritosContext';
import { useTema } from '../contexts/TemaContext';

interface HeaderProps {
  totalPersonagens: number | null;
}

export default function Header({ totalPersonagens }: HeaderProps) {
  const { totalFavoritos } = useFavoritos();
  const { tema, toggleTema } = useTema();

  return (
    <header className={`header header-${tema}`}>
      <div>
        <h1>🧬 Painel de Personagens</h1>
        <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
      </div>
      <div className="header-stats">
        <div className="contador">
          {totalPersonagens ? `${totalPersonagens} personagens` : '—'}
        </div>
        <div className="favoritos-contador">
          ❤️ {totalFavoritos} favorito{totalFavoritos !== 1 ? 's' : ''}
        </div>
        <button className="btn-tema" onClick={toggleTema} title="Toggle tema">
          {tema === 'claro' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritosContextType {
  favoritos: number[];
  toggleFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
  totalFavoritos: number;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

// Crie o contexto com:
// ✓ Interface FavoritosContextType:
//     favoritos: number[]
//     toggleFavorito: (id: number) => void
//     isFavorito: (id: number) => boolean
//     totalFavoritos: number
// ✓ createContext + FavoritosProvider com useLocalStorage
// ✓ Hook useFavoritos com validação (throw se fora do Provider)

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useLocalStorage<number[]>('favoritos', []);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorito = (id: number) => favoritos.includes(id);

  const value: FavoritosContextType = {
    favoritos,
    toggleFavorito,
    isFavorito,
    totalFavoritos: favoritos.length,
  };

  return (
    <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>
  );
}

export function useFavoritos(): FavoritosContextType {
  const contexto = useContext(FavoritosContext);
  if (!contexto) {
    throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider');
  }
  return contexto;
}
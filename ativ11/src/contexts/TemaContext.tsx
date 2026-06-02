import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Tema = 'claro' | 'escuro';

interface TemaContextType {
  tema: Tema;
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useLocalStorage<Tema>('tema', 'claro');

  const toggleTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  const value: TemaContextType = {
    tema,
    toggleTema,
  };

  return (
    <TemaContext.Provider value={value}>{children}</TemaContext.Provider>
  );
}

export function useTema(): TemaContextType {
  const contexto = useContext(TemaContext);
  if (!contexto) {
    throw new Error('useTema deve ser usado dentro de TemaProvider');
  }
  return contexto;
}

import { useState, useCallback } from 'react';

// Implemente useLocalStorage<T>(chave, valorInicial)
// ✓ useState com lazy initializer lendo localStorage
// ✓ Função de set que persiste ao mesmo tempo
// ✓ Suporte a setter funcional: setValor(prev => ...)
// ✓ Retorno 'as const' para tipagem correta

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const itemArmazenado = window.localStorage.getItem(chave);
      return itemArmazenado ? JSON.parse(itemArmazenado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  const setValorEPersistir = useCallback(
    (novoValor: T | ((prev: T) => T)) => {
      setValor((valorAtual) => {
        const valorParaPersistir = typeof novoValor === 'function' 
          ? (novoValor as (prev: T) => T)(valorAtual)
          : novoValor;
        
        try {
          window.localStorage.setItem(chave, JSON.stringify(valorParaPersistir));
        } catch (erro) {
          console.error(`Erro ao persistir ${chave}:`, erro);
        }
        
        return valorParaPersistir;
      });
    },
    [chave]
  );

  return [valor, setValorEPersistir] as const;
}
import { useState, useEffect } from 'react';

// Implemente useDebounce<T>(valor: T, delay = 400): T
// ✓ useState para o valor atrasado
// ✓ useEffect com setTimeout
// ✓ Cleanup correto (return () => clearTimeout(timer))

export function useDebounce<T>(valor: T, delay: number = 400): T {
  const [valorDebounced, setValorDebounced] = useState<T>(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounced(valor);
    }, delay);

    return () => clearTimeout(timer);
  }, [valor, delay]);

  return valorDebounced;
}

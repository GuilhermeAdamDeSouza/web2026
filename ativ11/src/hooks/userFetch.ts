import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  dados: T | null;
  loading: boolean;
  erro: string | null;
}

// Implemente useFetch<T>(url: string) com:
// ✓ useState para dados, loading e erro
// ✓ useEffect com AbortController
// ✓ Verificação de res.ok antes de .json()
// ✓ try/catch/finally correto
// ✓ Cleanup: return () => controller.abort()

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const buscar = async () => {
      setLoading(true);
      setErro(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = (await response.json()) as T;
        setDados(data);
      } catch (erro) {
        if (erro instanceof Error && erro.name !== 'AbortError') {
          setErro(erro.message);
        }
        setDados(null);
      } finally {
        setLoading(false);
      }
    };

    buscar();

    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
}
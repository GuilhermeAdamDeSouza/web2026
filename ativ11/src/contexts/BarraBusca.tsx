import { useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';

interface BarraBuscaProps {
  valor: string;
  onChange: (valor: string) => void;
}

export default function BarraBusca({ valor, onChange }: BarraBuscaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="campo-busca"
      placeholder="🔍 Buscar por nome..."
      value={valor}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}

import type { ChangeEvent } from 'react';

interface Props {
  valor: string;
  onChange: (valor: string) => void;
}

function BarraBusca({ valor, onChange }: Props) {
  return (
    <input
      type="text"
      className="campo-busca"
      placeholder="🔍 Buscar por nome..."
      value={valor}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
    />
  );
}

export default BarraBusca;

export interface Filme {
  id: number;
  titulo: string;
  ano: number;
  genero: string;
  duracao: number;
  sinopse: string;
}

export const FILMES: Filme[] = [
  {
    id: 1,
    titulo: "The Matrix",
    ano: 1999,
    genero: "Ação",
    duracao: 136,
    sinopse: "Um programador descobre que a realidade é uma simulação e se junta à resistência."
  },
  {
    id: 2,
    titulo: "Inception",
    ano: 2010,
    genero: "Ficção Científica",
    duracao: 148,
    sinopse: "Um ladrão especializado em roubar segredos dos sonhos recebe a missão de plantar uma ideia."
  },
  {
    id: 3,
    titulo: "Interstellar",
    ano: 2014,
    genero: "Ficção Científica",
    duracao: 169,
    sinopse: "Astronautas viajam por um buraco de minhoca em busca de um novo lar para a humanidade."
  },
  {
    id: 4,
    titulo: "The Dark Knight",
    ano: 2008,
    genero: "Ação",
    duracao: 152,
    sinopse: "Batman enfrenta o Coringa, um criminoso que semeia o caos em Gotham City."
  },
  {
    id: 5,
    titulo: "Pulp Fiction",
    ano: 1994,
    genero: "Crime",
    duracao: 154,
    sinopse: "Histórias entrelaçadas de criminosos, um boxeador e dois sicários em Los Angeles."
  }
];
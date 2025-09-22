import { Pet } from './Pet';

export interface Adocao {
    id: number;
    email: string;
    valor: string;
    pet: Pet;
    dataAdocao: string;
    nomeAdotante: string;
    telefoneAdotante?: string;
    enderecoAdotante?: string;
    status: 'pendente' | 'aprovado' | 'rejeitado' | 'concluido';
    observacoes?: string;
}
export interface Expenses {
  id: string;
  data: string;
  descricao: string;
  categoria: string;
  valor: number;
  status: 'pago' | 'pendente' | 'cancelado';
  recorrente: boolean;
}

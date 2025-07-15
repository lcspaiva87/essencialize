'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormField } from '@/types/form-filed-types';
import {
  CircleCheck,
  CircleX,
  DollarSign,
  Edit,
  Eye,
  FilterIcon,
  MoreHorizontal,
  Receipt,
  Save,
  SearchIcon,
  Trash2,
  TrendingUp,
  TriangleAlert,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'pago' | 'pendente';
  receipt: boolean;
}
import type { Expenses } from '@/types/expenses-types';
import { tv } from 'tailwind-variants';
import { TableExpenses } from './_components/table';

export default function Receitas() {
  const Earnings: Expenses[] = [
    {
      id: '1',
      data: '2024-01-15',
      descricao: 'Compra de ingredientes',
      categoria: 'Alimentação',
      valor: 150.0,
      status: 'pago',
      recorrente: true,
    },
    {
      id: '2',
      data: '2024-01-20',
      descricao: 'Pagamento de aluguel',
      categoria: 'Moradia',
      valor: 1200.0,
      status: 'pendente',
      recorrente: false,
    },
    {
      id: '3',
      data: '2024-01-25',
      descricao: 'Pagamento de conta de luz',
      categoria: 'Moradia',
      valor: 100.0,
      status: 'cancelado',
      recorrente: false,
    },
  ];
  const mockExpenses: Expense[] = [
    {
      id: '1',
      date: '07/03/2025',
      description: 'LUZ',
      category: 'Moradia',
      amount: 140.0,
      status: 'pago',
      receipt: false,
    },
    {
      id: '2',
      date: '06/03/2025',
      description: 'ÁGUA',
      category: 'Moradia',
      amount: 109.0,
      status: 'pago',
      receipt: false,
    },
    {
      id: '3',
      date: '05/03/2025',
      description: 'Supermercado',
      category: 'Alimentação',
      amount: 85.5,
      status: 'pendente',
      receipt: true,
    },
    {
      id: '4',
      date: '04/03/2025',
      description: 'Combustível',
      category: 'Transporte',
      amount: 120.0,
      status: 'pago',
      receipt: true,
    },
  ];
  const expensesFields: FormField[] = [
    {
      id: 'descricao',
      name: 'descricao',
      label: 'Descrição',
      type: 'text',
      required: true,
      description: 'Digite a descrição da despesa',
    },
    {
      id: 'valor',
      name: 'valor',
      label: 'Valor',
      type: 'currency',
      required: true,
      description: 'Digite o valor da despesa',
    },
    {
      id: 'categoria',
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      required: true,
      placeholder: 'Selecione uma categoria',
      description: 'Selecione a categoria da despesa',
      options: [
        { value: 'alimentacao', label: 'Alimentação' },
        { value: 'transporte', label: 'Transporte' },
        { value: 'moradia', label: 'Moradia' },
        { value: 'saude', label: 'Saúde' },
        { value: 'lazer', label: 'Lazer' },
        { value: 'outros', label: 'Outros' },
      ],
    },
    {
      id: 'data',
      name: 'data',
      label: 'Data',
      type: 'date',
      required: true,
      description: 'Digite a data da despesa',
    },
    {
      id: 'status',
      name: 'status',
      label: 'Status',
      type: 'select',
      description: 'Marque se esta despesa é recorrente',
      options: [
        { value: 'pendente', label: 'Pendente' },
        { value: 'pago', label: 'Pago' },
        { value: 'cancelado', label: 'Cancelado' },
      ],
    },

    {
      id: 'form-pagamento',
      name: 'form-pagamento',
      label: 'Formas de pagamento',
      type: 'select',
      description: 'Selecione a forma de pagamento',
      options: [
        { value: 'pix', label: 'Pix' },
        { value: 'cartao', label: 'Cartão' },
        { value: 'dinheiro', label: 'Dinheiro' },
      ],
    },
    {
      id: 'despesa-recorrente',
      name: 'despesa-recorrente',
      label: 'Despesa recorrente',
      type: 'checkbox',
      description: 'Marque se esta despesa é recorrente',
    },
  ];

  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const paidExpenses = expenses
    .filter((e) => e.status === 'pago')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses
    .filter((e) => e.status === 'pendente')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <Header
        bgColor="bg-red-400"
        buttonIcon={<Save className="h-4 w-4" />}
        buttonText="Nova Despesa"
        description="Gerencie suas despesas de forma eficiente"
        fields={expensesFields}
        isCreate={true}
        title="Gerenciamento de Despesas"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Total de Despesas
                </p>
                <p className="text-2xl font-light text-red-600">
                  R${' '}
                  {totalExpenses.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Receipt className="text-red-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Despesas Pagas
                </p>
                <p className="text-2xl font-light text-green-600">
                  R${' '}
                  {paidExpenses.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Despesas Pendentes
                </p>
                <p className="text-2xl font-light text-yellow-600">
                  R${' '}
                  {pendingExpenses.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Receipt className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <section
        aria-label="Filtros de receitas"
        className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <FilterIcon aria-hidden="true" className="h-4 w-4" />
          <h2 className="font-bold text-base text-gray-900">Filtros</h2>
        </div>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <fieldset className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor="data-inicial"
            >
              Data inicial
            </label>
            <Input
              aria-describedby="data-inicial-desc"
              id="data-inicial"
              name="dataInicial"
              type="date"
            />
            <span className="sr-only" id="data-inicial-desc">
              Selecione a data inicial para filtrar as receitas
            </span>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor="data-final"
            >
              Data final
            </label>
            <Input
              aria-describedby="data-final-desc"
              id="data-final"
              name="dataFinal"
              type="date"
            />
            <span className="sr-only" id="data-final-desc">
              Selecione a data final para filtrar as receitas
            </span>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor="categoria"
            >
              Categoria
            </label>
            <Select name="categoria">
              <SelectTrigger aria-describedby="categoria-desc" id="categoria">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
            </Select>
            <span className="sr-only" id="categoria-desc">
              Filtre as receitas por categoria
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor="status"
            >
              Status
            </label>
            <Select name="status">
              <SelectTrigger aria-describedby="status-desc" id="status">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
            </Select>
            <span className="sr-only" id="status-desc">
              Filtre as receitas por status
            </span>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor="pesquisar"
            >
              Pesquisar
            </label>
            <Input
              aria-describedby="pesquisar-desc"
              aria-label="Pesquisar receitas"
              id="pesquisar"
              name="pesquisar"
              placeholder="Digite sua pesquisa..."
              type="search"
            />
            <span className="sr-only" id="pesquisar-desc">
              Digite um termo para pesquisar nas receitas
            </span>
          </fieldset>

          <div className="col-span-full flex gap-2">
            <Button className="col-span-full text-white">
              <SearchIcon className="h-4 w-4" />
              Pesquisar
            </Button>

            <Button className="col-span-full " variant="outline">
              <X className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </form>
        <TableExpenses expenses={Earnings} />
      </section>
    </main>
  );
}

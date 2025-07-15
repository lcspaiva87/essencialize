'use client';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { FormField } from '@/types/form-filed-types';
import {
  Edit,
  Eye,
  FilterIcon,
  MoreHorizontal,
  Save,
  SearchIcon,
  Trash2,
  X,
} from 'lucide-react';

export default function Receitas() {
  const Earnings = [
    {
      id: '1',
      data: '2024-01-15',
      descricao: 'Compra de ingredientes',
      categoria: 'Alimentação',
      valor: 150.0,
      recorrente: true,
    },
    {
      id: '2',
      data: '2024-01-20',
      descricao: 'Pagamento de aluguel',
      categoria: 'Moradia',
      valor: 1200.0,
      recorrente: false,
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Recorrente</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Earnings.map((receita) => (
                <TableRow key={receita.id}>
                  <TableCell className="font-medium">
                    {new Date(receita.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>{receita.descricao}</TableCell>
                  <TableCell>{receita.categoria}</TableCell>
                  <TableCell>
                    {receita.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                  <TableCell>{receita.recorrente ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0" variant="ghost">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}

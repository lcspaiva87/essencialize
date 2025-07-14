import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, FilterIcon, MoreHorizontal, PlusIcon, SearchIcon, Trash2, X } from "lucide-react";

export default function Receitas() {
  const Earnings = [
    {
      data: "2024-01-15",
      descricao: "Compra de ingredientes",
      categoria: "Alimentação",
      valor: 150.00,
      recorrente: true
    },
    {
      data: "2024-01-20",
      descricao: "Pagamento de aluguel",
      categoria: "Moradia",
      valor: 1200.00,
      recorrente: false
    },
  ];

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Header
        title="Gerenciamento de Receitas"
        description="Gerencie suas receitas de forma eficiente"
        buttonText="Nova Receita"
        buttonIcon={<PlusIcon className="w-4 h-4" />}
        isCreate={true}
      />

      <section
        className="flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        aria-label="Filtros de receitas"
      >
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4" aria-hidden="true" />
          <h2 className="text-base font-bold text-gray-900">Filtros</h2>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="search">
          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="data-inicial" className="text-sm font-medium text-gray-500">
              Data inicial
            </label>
            <Input
              type="date"
              id="data-inicial"
              name="dataInicial"
              aria-describedby="data-inicial-desc"
            />
            <span id="data-inicial-desc" className="sr-only">
              Selecione a data inicial para filtrar as receitas
            </span>
          </fieldset>

          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="data-final" className="text-sm font-medium text-gray-500">
              Data final
            </label>
            <Input
              type="date"
              id="data-final"
              name="dataFinal"
              aria-describedby="data-final-desc"
            />
            <span id="data-final-desc" className="sr-only">
              Selecione a data final para filtrar as receitas
            </span>
          </fieldset>

          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="categoria" className="text-sm font-medium text-gray-500">
              Categoria
            </label>
            <Select name="categoria">
              <SelectTrigger id="categoria" aria-describedby="categoria-desc">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
            </Select>
            <span id="categoria-desc" className="sr-only">
              Filtre as receitas por categoria
            </span>
          </fieldset>

          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="pesquisar" className="text-sm font-medium text-gray-500">
              Pesquisar
            </label>
            <Input
              type="search"
              id="pesquisar"
              name="pesquisar"
              placeholder="Digite sua pesquisa..."
              aria-label="Pesquisar receitas"
              aria-describedby="pesquisar-desc"
            />
            <span id="pesquisar-desc" className="sr-only">
              Digite um termo para pesquisar nas receitas
            </span>
          </fieldset>

          <div className="flex gap-2 col-span-full">
            <Button className="col-span-full text-white">
              <SearchIcon className="w-4 h-4" />
              Pesquisar
            </Button>

            <Button
              variant="outline"
              className="col-span-full ">
              <X className="w-4 h-4" />
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
              {Earnings.map((receita, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{new Date(receita.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{receita.descricao}</TableCell>
                  <TableCell>{receita.categoria}</TableCell>
                  <TableCell>{receita.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell>{receita.recorrente ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
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
    </main >
  )
}
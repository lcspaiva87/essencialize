import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterIcon, PlusIcon } from "lucide-react";

export default function Receitas() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Header
        title="Gerenciamento de Receitas"
        description="Gerencie suas receitas de forma eficiente"
        buttonText="Nova Receita"
        buttonIcon={<PlusIcon className="w-4 h-4" />}
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
        </form>
      </section>
    </main>
  )
}
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, Wallet } from "lucide-react";

interface ModalCreateEarningsProps {
  buttonText: string;
  buttonIcon: React.ReactNode;
}

export function ModalCreateEarnings({ buttonText, buttonIcon }: ModalCreateEarningsProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center gap-2  text-white">
          {buttonIcon && <>{buttonIcon}</>}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="bg-primary p-4  flex  justify-between">
          <DialogTitle className="text-white flex  gap-2">
            {buttonIcon && <>{buttonIcon}</>}
            {buttonText}
          </DialogTitle>

        </DialogHeader>
        <form className="flex flex-col gap-4 p-4">
          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="descricao" className="text-sm font-medium text-gray-500">
              Descrição
            </label>
            <Input
              type="text"
              id="descricao"
              name="descricao"
              aria-describedby="descricao-desc"
            />
            <span id="descricao-desc" className="sr-only">
              Digite a descrição da receita
            </span>
          </fieldset>

          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="valor" className="text-sm font-medium text-gray-500">
              Valor
            </label>
            <div className="relative flex items-center w-full ">
              <div className="absolute left-3 text-gray-400">
                <Wallet className="w-4 h-4" />
              </div>
              <div className="absolute left-10 inset-y-0 w-px bg-gray-300"></div>
              <Input
                type="text"
                id="valor"
                name="valor"
                aria-describedby="valor-desc"
                placeholder="R$ 0,00"
                className="flex-grow pl-14 pr-4 py-2 w-full   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out "
              />
            </div>
            <span id="valor-desc" className="sr-only">
              Digite o valor da receita
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
              Digite a categoria da receita
            </span>
          </fieldset>


          <fieldset className="flex gap-2 flex-col">
            <label htmlFor="data" className="text-sm font-medium text-gray-500">
              Data
            </label>
            <Input
              type="date"
              id="data"
              name="data"
              aria-describedby="data-desc"
              className="text-gray-500"
            />
            <span id="data-desc" className="sr-only">
              Digite a data da receita
            </span>
          </fieldset>

          <fieldset className="flex gap-2 items-center">
            <Input type="checkbox" id="recorrente" name="recorrente" className="w-4 h-4" />
            <label htmlFor="recorrente" className="text-sm font-medium text-gray-500">
              Recorrente
            </label>
          </fieldset>

          <Button className="w-full text-white">
            <PlusIcon className="w-4 h-4" />
            Adicionar

          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
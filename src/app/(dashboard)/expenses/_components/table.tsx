import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { badgevariant, badgevariantRecurrent } from '@/lib/utils';
import type { Expenses } from '@/types/expenses-types';
import { MoreHorizontal } from 'lucide-react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';

interface TableExpensesProps {
  expenses: Expenses[];
}

export function TableExpenses({ expenses }: TableExpensesProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="!w-12">Recorrente</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((receita) => (
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
              <TableCell>
                <Badge
                  className={badgevariant({
                    status: receita.status as 'pago' | 'pendente' | 'cancelado',
                  })}
                >
                  {receita.status === 'pago' && <CircleCheck size={16} />}
                  {receita.status === 'pendente' && <TriangleAlert size={16} />}
                  {receita.status === 'cancelado' && <CircleX size={16} />}
                  {receita.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={badgevariantRecurrent({
                    status: receita.recorrente ? 'yes' : 'no',
                  })}
                >
                  {receita.recorrente ? 'Sim' : 'Não'}
                </Badge>
              </TableCell>
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
  );
}

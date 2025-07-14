import type { Transaction } from '@/types';
import { ArrowDownRight, ArrowUpRight, Clock, Hash } from 'lucide-react';
import type React from 'react';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const recentTransactions = transactions.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-lg">
          Transações Recentes
        </h3>
        <Clock className="h-5 w-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            key={transaction.id}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`rounded-lg p-2 ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.description}
                  {transaction.tags && transaction.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {transaction.tags.slice(0, 2).map((tag) => (
                        <span
                          className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-gray-600 text-xs"
                          key={tag}
                        >
                          <Hash className="mr-0.5 h-2 w-2" />
                          {tag}
                        </span>
                      ))}
                      {transaction.tags.length > 2 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-gray-600 text-xs">
                          +{transaction.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </p>
                <p className="text-gray-500 text-sm">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}R${' '}
                {transaction.amount.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1">
                <div
                  className={`h-2 w-2 rounded-full ${
                    transaction.reconciled ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
                <span className="text-gray-500 text-xs">
                  {transaction.reconciled ? 'Reconciliado' : 'Pendente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;

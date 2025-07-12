import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, Hash } from 'lucide-react';
import { Transaction } from '../../../../../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Transações Recentes
        </h3>
        <Clock className="h-5 w-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${transaction.type === 'income'
                ? 'bg-green-100'
                : 'bg-red-100'
                }`}>
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
                    <div className="flex flex-wrap gap-1 mt-1">
                      {transaction.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                        >
                          <Hash className="h-2 w-2 mr-0.5" />
                          {tag}
                        </span>
                      ))}
                      {transaction.tags.length > 2 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                          +{transaction.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${transaction.type === 'income'
                ? 'text-green-600'
                : 'text-red-600'
                }`}>
                {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${transaction.reconciled
                  ? 'bg-green-500'
                  : 'bg-yellow-500'
                  }`} />
                <span className="text-xs text-gray-500">
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
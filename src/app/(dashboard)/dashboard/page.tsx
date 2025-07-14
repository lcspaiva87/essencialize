'use client';
import { Button } from '@/components/ui/button';
import { useFinancialData } from '@/hooks/useFinancialData';
import {
  CreditCard,
  DollarSign,
  PiggyBank,
  Target,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import type React from 'react';
import ExpenseChart from './_components/ExpenseChart';
import GoalsProgress from './_components/GoalsProgress';
import RecentTransactions from './_components/RecentTransactions';
import StatsCard from './_components/StatsCard';
import ChartPizza from './chart/chart-pizza';
import { ChartContent } from './chart/chat-bar';

const Dashboard: React.FC = () => {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    expensesByCategory,
    goals,
    transactions,
  } = useFinancialData();

  const monthlyNet = monthlyIncome - monthlyExpenses;
  const savingsRate =
    monthlyIncome > 0 ? ((monthlyNet / monthlyIncome) * 100).toFixed(1) : '0';

  return (
    <main className=" w-full px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div>
          <h1 className="mb-2 font-bold text-3xl text-gray-900">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-600">
            Visão geral das suas finanças em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Dia</Button>
          <Button className="bg-gray-100 text-gray-900" variant="outline">
            Semana
          </Button>
          <Button variant="outline">Mês</Button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          change="+5.2% este mês"
          changeType="positive"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          icon={DollarSign}
          title="Saldo Total"
          value={`R$ ${totalBalance.toLocaleString()}`}
        />
        <StatsCard
          change="+12.3% vs mês anterior"
          changeType="positive"
          color="bg-gradient-to-r from-green-500 to-green-600"
          icon={TrendingUp}
          title="Receitas do Mês"
          value={`R$ ${monthlyIncome.toLocaleString()}`}
        />
        <StatsCard
          change="-8.1% vs mês anterior"
          changeType="positive"
          color="bg-gradient-to-r from-red-500 to-red-600"
          icon={TrendingDown}
          title="Gastos do Mês"
          value={`R$ ${monthlyExpenses.toLocaleString()}`}
        />
        <StatsCard
          change="Meta: 20%"
          changeType="positive"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          icon={PiggyBank}
          title="Taxa de Poupança"
          value={`${savingsRate}%`}
        />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartContent />
        <ChartPizza />
      </div>
      {/* Charts and Goals */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpenseChart data={expensesByCategory} />
        <GoalsProgress goals={goals} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900 text-lg">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            className="flex items-center space-x-3 rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100"
            type="button"
          >
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">Nova Transação</span>
          </button>
          <button
            className="flex items-center space-x-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
            type="button"
          >
            <Target className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Criar Meta</span>
          </button>
          <button
            className="flex items-center space-x-3 rounded-lg bg-purple-50 p-4 transition-colors hover:bg-purple-100"
            type="button"
          >
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Gerar Relatório</span>
          </button>
          <button
            className="flex items-center space-x-3 rounded-lg bg-orange-50 p-4 transition-colors hover:bg-orange-100"
            type="button"
          >
            <PiggyBank className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-900">
              Definir Orçamento
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

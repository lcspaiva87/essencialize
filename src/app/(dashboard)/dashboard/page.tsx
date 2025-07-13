'use client';
import React from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  CreditCard,
  PiggyBank,
} from 'lucide-react';
import ExpenseChart from './_components/ExpenseChart';
import StatsCard from './_components/StatsCard';
import GoalsProgress from './_components/GoalsProgress';
import RecentTransactions from './_components/RecentTransactions';
import { useFinancialData } from '@/hooks/useFinancialData';
import { Button } from '@/components/ui/button';
import { ChartContent } from './chart/chat-bar';
import ChartPizza from './chart/chart-pizza';

const Dashboard: React.FC = () => {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    expensesByCategory,
    goals,
    transactions
  } = useFinancialData();

  const monthlyNet = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((monthlyNet / monthlyIncome) * 100).toFixed(1) : '0';

  return (
    <main className=" px-4 sm:px-6 lg:px-8 py-8 w-full">


      <header className="mb-8 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-600">
            Visão geral das suas finanças em tempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            Dia
          </Button>
          <Button variant="outline" className='bg-gray-100 text-gray-900'>
            Semana
          </Button>
          <Button variant="outline">
            Mês
          </Button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Saldo Total"
          value={`R$ ${totalBalance.toLocaleString()}`}
          change="+5.2% este mês"
          changeType="positive"
          icon={DollarSign}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Receitas do Mês"
          value={`R$ ${monthlyIncome.toLocaleString()}`}
          change="+12.3% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatsCard
          title="Gastos do Mês"
          value={`R$ ${monthlyExpenses.toLocaleString()}`}
          change="-8.1% vs mês anterior"
          changeType="positive"
          icon={TrendingDown}
          color="bg-gradient-to-r from-red-500 to-red-600"
        />
        <StatsCard
          title="Taxa de Poupança"
          value={`${savingsRate}%`}
          change="Meta: 20%"
          changeType="positive"
          icon={PiggyBank}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2  gap-6 mb-8'>
        <ChartContent />
        <ChartPizza />
      </div>
      {/* Charts and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ExpenseChart data={expensesByCategory} />
        <GoalsProgress goals={goals} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Nova Transação
            </span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Target className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">
              Criar Meta
            </span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">
              Gerar Relatório
            </span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
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
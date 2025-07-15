'use client';

import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

function ChatBar() {
  const chartData = [
    {
      name: 'Jan',
      Receita: 4000,
      Despesa: 2400,
      'Fluxo de Caixa Líquido': 1600,
    },
    {
      name: 'Fev',
      Receita: 3000,
      Despesa: 1398,
      'Fluxo de Caixa Líquido': 1602,
    },
    {
      name: 'Mar',
      Receita: 5000,
      Despesa: 3800,
      'Fluxo de Caixa Líquido': 1200,
    },
    {
      name: 'Abr',
      Receita: 4500,
      Despesa: 2908,
      'Fluxo de Caixa Líquido': 1592,
    },
    {
      name: 'Mai',
      Receita: 6000,
      Despesa: 4800,
      'Fluxo de Caixa Líquido': 1200,
    },
    {
      name: 'Jun',
      Receita: 5500,
      Despesa: 3500,
      'Fluxo de Caixa Líquido': 2000,
    },
    {
      name: 'Jul',
      Receita: 7000,
      Despesa: 5200,
      'Fluxo de Caixa Líquido': 1800,
    },
    {
      name: 'Ago',
      Receita: 4800,
      Despesa: 3000,
      'Fluxo de Caixa Líquido': 1800,
    },
    {
      name: 'Set',
      Receita: 5200,
      Despesa: 3400,
      'Fluxo de Caixa Líquido': 1800,
    },
    {
      name: 'Out',
      Receita: 6500,
      Despesa: 4000,
      'Fluxo de Caixa Líquido': 2500,
    },
    {
      name: 'Nov',
      Receita: 5800,
      Despesa: 3700,
      'Fluxo de Caixa Líquido': 2100,
    },
    {
      name: 'Dez',
      Receita: 7500,
      Despesa: 4900,
      'Fluxo de Caixa Líquido': 2600,
    },
  ];
  const chartConfig = {
    income: {
      label: 'Receitas',
      color: '#34D399',
    },
    expenses: {
      label: 'Despesas',
      color: '#EF4444',
    },
    balance: {
      label: 'Saldo Acumulado',
      color: '#3B82F6',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      className="min-h-[150px] w-full bg-white "
      config={chartConfig}
    >
      <LineChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
          formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
          itemStyle={{ color: '#555' }}
          labelStyle={{ color: '#333', fontWeight: 'bold' }}
        />
        <Line
          dataKey="Receita"
          dot={{ r: 5 }}
          stroke="#22c55e"
          strokeWidth={3}
          type="monotone"
        />
        <Line
          dataKey="Despesa"
          dot={{ r: 5 }}
          stroke="#ef4444"
          strokeWidth={3}
          type="monotone"
        />
        <Line
          dataKey="Fluxo de Caixa Líquido"
          dot={{ r: 5 }}
          stroke="#3b82f6"
          strokeWidth={3}
          type="monotone"
        />
        <XAxis
          className="text-gray-600 text-sm dark:text-gray-300"
          dataKey="name"
        />
        <YAxis className="text-gray-600 text-sm dark:text-gray-300" />

        <Legend />
      </LineChart>
    </ChartContainer>
  );
}

function ChartHeader() {
  return (
    <div className="flex items-center gap-2">
      <h2 className="font-normal text-base text-gray-500">Fluxo de caixa</h2>
    </div>
  );
}

export function ChartContent() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <ChartHeader />
      <ChatBar />
    </div>
  );
}

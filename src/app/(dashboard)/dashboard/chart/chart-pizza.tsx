import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Aluguel', value: 1200 },
  { name: 'Alimentação', value: 800 },
  { name: 'Transporte', value: 300 },
  { name: 'Lazer', value: 450 },
  { name: 'Contas', value: 600 },
  { name: 'Outros', value: 250 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

interface PayloadItem {
  name: string;
  value: number;
  percent: number;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: PayloadItem[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
        <p className="font-bold text-gray-900 dark:text-white">{`${payload[0].name}`}</p>
        <p className="text-gray-700 dark:text-gray-300">{`Valor: R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
        <p className="text-gray-700 dark:text-gray-300">{`Porcentagem: ${(payload[0].percent * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // Distance from the center to the label
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x}
      y={y}
      fill={COLORS[index % COLORS.length]} // Use the color of the slice for the text
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-sm font-semibold">
      {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartPizza = () => {
  return (
    <div className="p-4 border border-gray-100 shadow-sm rounded-xl">
      <h2 className='text-base font-normal text-gray-500'>Despesas por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            itemStyle={{ color: '#555' }}
            formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
          />
          <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPizza;

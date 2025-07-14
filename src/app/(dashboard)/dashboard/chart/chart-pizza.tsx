import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const data = [
  {
    id: '1',
    name: 'Aluguel',
    value: 1200,
  },
  {
    id: '2',
    name: 'Alimentação',
    value: 800,
  },
  {
    id: '3',
    name: 'Transporte',
    value: 300,
  },
  {
    id: '4',
    name: 'Outros',
    value: 250,
  },
]

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#a4de6c',
  '#d0ed57',
]

interface PayloadItem {
  name: string
  value: number
  percent: number
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: PayloadItem[]
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md dark:border-gray-600 dark:bg-gray-700">
        <p className="font-bold text-gray-900 dark:text-white">{`${payload[0].name}`}</p>
        <p className="text-gray-700 dark:text-gray-300">{`Valor: R$ ${payload[0].value.toLocaleString('pt-BR')}`}</p>
        <p className="text-gray-700 dark:text-gray-300">{`Porcentagem: ${(payload[0].percent * 100).toFixed(2)}%`}</p>
      </div>
    )
  }
  return null
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}) => {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 20 // Distance from the center to the label
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      className="font-semibold text-sm"
      dominantBaseline="central"
      fill={COLORS[index % COLORS.length]} // Use the color of the slice for the text
      textAnchor={x > cx ? 'start' : 'end'}
      x={x}
      y={y}
    >
      {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const ChartPizza = () => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="font-normal text-base text-gray-500">
        Despesas por Categoria
      </h2>
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
            outerRadius={80}
          >
            {data.map((item, index) => (
              <Cell
                fill={COLORS[index % COLORS.length]}
                key={`cell-${item.id}`}
              />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
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
          <Legend
            align="right"
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartPizza

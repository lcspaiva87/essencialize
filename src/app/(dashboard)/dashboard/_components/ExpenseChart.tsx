import type React from 'react'

interface ExpenseData {
  category: string
  amount: number
  color: string
}

interface ExpenseChartProps {
  data: ExpenseData[]
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 font-semibold text-gray-900 text-lg">
        Gastos por Categoria
      </h3>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = (item.amount / total) * 100

          return (
            <div
              className="flex items-center justify-between"
              key={item.category}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-gray-900 text-sm">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-20 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span className="w-16 text-right font-bold text-gray-900 text-sm">
                  R$ {item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExpenseChart

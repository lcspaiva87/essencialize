import type { DivideIcon as LucideIcon } from 'lucide-react'
import type React from 'react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: typeof LucideIcon
  color: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}) => {
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  }[changeType]

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="mb-1 font-normal text-base text-gray-500">{title}</p>
          <p className="mb-2 font-bold text-gray-900 text-lg">{value}</p>
          <p className={`font-medium text-sm ${changeColorClass}`}>{change}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

export default StatsCard

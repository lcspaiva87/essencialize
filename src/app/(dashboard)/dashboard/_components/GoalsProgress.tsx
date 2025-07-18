import type { Goal } from '@/types';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import type React from 'react';

interface GoalsProgressProps {
  goals: Goal[];
}

const GoalsProgress: React.FC<GoalsProgressProps> = ({ goals }) => {
  const activeGoals = goals.filter((goal) => !goal.completed).slice(0, 3);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-lg">
          Progresso das Metas
        </h3>
        <Target className="h-5 w-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {activeGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          const daysRemaining = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          );

          return (
            <div className="rounded-lg bg-gray-50 p-4" key={goal.id}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <span
                    className={`rounded-full px-2 py-1 font-medium text-xs ${getPriorityColor(goal.priority)}`}
                  >
                    {goal.priority}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  {progress.toFixed(1)}%
                </span>
              </div>

              <div className="mb-3">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-gray-600">
                      R$ {goal.currentAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3 text-blue-500" />
                    <span className="text-gray-600">{daysRemaining} dias</span>
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  R$ {remainingAmount.toLocaleString()} restantes
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsProgress;

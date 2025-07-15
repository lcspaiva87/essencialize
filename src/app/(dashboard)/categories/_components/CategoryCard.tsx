import { Button } from '@/components/ui/button';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  type: 'receita' | 'despesa';
  icon: string;
  color: string;
  isDefault?: boolean;
}

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}
        >
          <span
            className="text-white text-lg"
            role="img"
            aria-label={category.name}
          >
            {category.icon}
          </span>
        </div>

        <div className="relative">
          <Button
            onClick={() => setShowMenu(!showMenu)}
            onKeyDown={handleKeyDown}
            className="p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label={`Opções para ${category.name}`}
            aria-expanded={showMenu}
            aria-haspopup="true"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <Button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{category.type}</p>
      </div>
    </div>
  );
}

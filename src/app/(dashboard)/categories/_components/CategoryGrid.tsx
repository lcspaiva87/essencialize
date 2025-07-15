'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './CategoryModal';

interface Category {
  id: string;
  name: string;
  type: 'receita' | 'despesa';
  icon: string;
  color: string;
  isDefault?: boolean;
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Alimentação',
    type: 'receita',
    icon: '🍽️',
    color: 'bg-red-500',
  },
  {
    id: '2',
    name: 'Educação',
    type: 'receita',
    icon: '📚',
    color: 'bg-blue-500',
  },
  {
    id: '3',
    name: 'Investimentos',
    type: 'receita',
    icon: '💰',
    color: 'bg-green-500',
  },
  {
    id: '4',
    name: 'Lazer',
    type: 'receita',
    icon: '🎮',
    color: 'bg-purple-500',
  },
  {
    id: '5',
    name: 'Moradia',
    type: 'receita',
    icon: '🏠',
    color: 'bg-orange-500',
  },
  {
    id: '6',
    name: 'Outras Despesas',
    type: 'receita',
    icon: '💸',
    color: 'bg-gray-500',
  },
  {
    id: '7',
    name: 'Outros Rendimentos',
    type: 'receita',
    icon: '💵',
    color: 'bg-teal-500',
  },
  {
    id: '8',
    name: 'Salário',
    type: 'receita',
    icon: '💼',
    color: 'bg-green-600',
  },
  { id: '9', name: 'Saúde', type: 'receita', icon: '❤️', color: 'bg-pink-500' },
  {
    id: '10',
    name: 'Transporte',
    type: 'receita',
    icon: '🚗',
    color: 'bg-yellow-500',
  },
  // Categorias de despesas
  {
    id: '11',
    name: 'Alimentação',
    type: 'despesa',
    icon: '🍽️',
    color: 'bg-red-500',
  },
  {
    id: '12',
    name: 'Educação',
    type: 'despesa',
    icon: '📚',
    color: 'bg-blue-500',
  },
  {
    id: '13',
    name: 'Investimentos',
    type: 'despesa',
    icon: '💰',
    color: 'bg-green-500',
  },
  {
    id: '14',
    name: 'Lazer',
    type: 'despesa',
    icon: '🎮',
    color: 'bg-purple-500',
  },
  {
    id: '15',
    name: 'Moradia',
    type: 'despesa',
    icon: '🏠',
    color: 'bg-orange-500',
  },
  {
    id: '16',
    name: 'Nubank',
    type: 'despesa',
    icon: '💳',
    color: 'bg-purple-600',
  },
  {
    id: '17',
    name: 'Outras Despesas',
    type: 'despesa',
    icon: '💸',
    color: 'bg-gray-500',
  },
  {
    id: '18',
    name: 'Outros Rendimentos',
    type: 'despesa',
    icon: '💵',
    color: 'bg-teal-500',
  },
];

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const receitas = categories.filter((cat) => cat.type === 'receita');
  const despesas = categories.filter((cat) => cat.type === 'despesa');

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  const handleSaveCategory = (categoryData: Omit<Category, 'id'>) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...categoryData, id: editingCategory.id }
            : cat,
        ),
      );
    } else {
      const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Categorias de Receitas
          </h2>
          <Button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Adicionar Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {receitas.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => handleDeleteCategory(category.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Categorias de Despesas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {despesas.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => handleDeleteCategory(category.id)}
            />
          ))}
        </div>
      </section>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
}

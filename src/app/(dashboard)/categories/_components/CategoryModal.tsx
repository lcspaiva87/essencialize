import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  type: 'receita' | 'despesa';
  icon: string;
  color: string;
  isDefault?: boolean;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
  category?: Category | null;
}

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-gray-500',
  'bg-teal-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-indigo-500',
];

const icons = [
  '🍽️',
  '📚',
  '💰',
  '🎮',
  '🏠',
  '💸',
  '💵',
  '💼',
  '❤️',
  '🚗',
  '💳',
  '🛒',
];

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
}: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'receita' as 'receita' | 'despesa',
    icon: '🍽️',
    color: 'bg-red-500',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
      });
    } else {
      setFormData({
        name: '',
        type: 'receita',
        icon: '🍽️',
        color: 'bg-red-500',
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className=" space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Categoria
            </Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg "
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'receita' | 'despesa',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg "
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Ícone
            </Label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => (
                <Button
                  key={icon}
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.icon === icon
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{icon}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cor
            </label>
            <Input
              type="color"
              id="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-full h-10 rounded-lg border-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              aria-label="Selecionar cor"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </Button>
            <Button type="submit" className="px-4 py-2  text-white">
              {category ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

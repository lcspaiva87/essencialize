import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  idealQuantity: number;
  currentQuantity: number;
  estimatedPrice: number;
  status: 'adequate' | 'medium' | 'low';
}

interface ShoppingItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ShoppingItem, 'id'>) => void;
  item?: ShoppingItem | null;
}

const categories = ['Alimentos', 'Limpeza', 'Higiene', 'Bebidas', 'Outros'];
const units = ['unidade', 'kg', 'g', 'litro', 'ml', 'pacote', 'caixa'];

export function ShoppingItemModal({
  isOpen,
  onClose,
  onSave,
  item,
}: ShoppingItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Alimentos',
    unit: 'unidade',
    idealQuantity: 1,
    currentQuantity: 0,
    estimatedPrice: 0,
    status: 'low' as 'adequate' | 'medium' | 'low',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        unit: item.unit,
        idealQuantity: item.idealQuantity,
        currentQuantity: item.currentQuantity,
        estimatedPrice: item.estimatedPrice,
        status: item.status,
      });
    } else {
      setFormData({
        name: '',
        category: 'Alimentos',
        unit: 'unidade',
        idealQuantity: 1,
        currentQuantity: 0,
        estimatedPrice: 0,
        status: 'low',
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate status based on quantities
    const percentage =
      (formData.currentQuantity / formData.idealQuantity) * 100;
    let status: 'adequate' | 'medium' | 'low' = 'adequate';

    if (percentage < 30) status = 'low';
    else if (percentage < 99) status = 'medium';

    onSave({ ...formData, status });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? 'Editar Item' : 'Novo Item'}
          </h2>
          <Button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Item *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              placeholder="Ex: Arroz, Feijão, Detergente..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoria *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Unidade de Medida *
              </label>
              <select
                id="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="idealQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade Ideal *
              </label>
              <input
                type="number"
                id="idealQuantity"
                value={formData.idealQuantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    idealQuantity: Number.parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label
                htmlFor="currentQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantidade Atual
              </label>
              <input
                type="number"
                id="currentQuantity"
                value={formData.currentQuantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentQuantity: Number.parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="estimatedPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preço Estimado (R$)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              value={formData.estimatedPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedPrice: Number.parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {item ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

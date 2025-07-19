'use client';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  Edit2,
  Filter,
  Plus,
  Share,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { ShoppingItemModal } from './_components/ShoppingItemModal';

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

const initialItems: ShoppingItem[] = [
  {
    id: '1',
    name: 'Arroz',
    category: 'Alimentos',
    unit: 'unidade',
    idealQuantity: 1.0,
    currentQuantity: 0.0,
    estimatedPrice: 29.9,
    status: 'low',
  },
  {
    id: '2',
    name: 'Feijão Camil',
    category: 'Alimentos',
    unit: 'unidade',
    idealQuantity: 1.0,
    currentQuantity: 1.0,
    estimatedPrice: 7.9,
    status: 'adequate',
  },
];

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const budget = 700.0;
  const estimatedCost = items.reduce(
    (sum, item) => sum + item.estimatedPrice,
    0,
  );
  const availableBalance = budget - estimatedCost;
  const totalItems = items.length;
  const missingItems = items.filter(
    (item) => item.currentQuantity < item.idealQuantity,
  ).length;
  const completionPercentage = ((totalItems - missingItems) / totalItems) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'adequate':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'adequate':
        return 'bg-green-100';
      case 'medium':
        return 'bg-yellow-100';
      case 'low':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'adequate':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch =
      selectedCategory === 'all' || item.category === selectedCategory;
    const missingMatch =
      !showOnlyMissing || item.currentQuantity < item.idealQuantity;
    return categoryMatch && missingMatch;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSaveItem = (itemData: Omit<ShoppingItem, 'id'>) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...itemData, id: editingItem.id }
            : item,
        ),
      );
    } else {
      const newItem: ShoppingItem = {
        ...itemData,
        id: Date.now().toString(),
      };
      setItems((prev) => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const percentage = (newQuantity / item.idealQuantity) * 100;
          let status: 'adequate' | 'medium' | 'low' = 'adequate';

          if (percentage < 30) status = 'low';
          else if (percentage < 99) status = 'medium';

          return { ...item, currentQuantity: newQuantity, status };
        }
        return item;
      }),
    );
  };

  const handleExport = (type: string) => {
    setShowExportMenu(false);
  };

  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-4">
      <Breadcrumb />
      <div className="flex flex-row gap-4 justify-between">
        <section>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar Lista de Compras
          </h1>
          <p className="text-gray-600 mb-8">
            Organize suas compras com a lista de compras personalizada
          </p>
        </section>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          >
            <Plus className="w-4 h-4" />
            Novo Item
          </Button>

          <div className="relative">
            <Button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>

            {showExportMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <Button
                  onClick={() => handleExport('Lista de Compras')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Gerar Lista de Compras
                </Button>
                <Button
                  onClick={() => handleExport('WhatsApp')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Copiar para WhatsApp
                </Button>
                <Button
                  onClick={() => handleExport('CSV')}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar para CSV
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Orçamento Mensal
            </h3>
            <Button className="p-1 text-gray-400 hover:text-gray-600">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                R$ {budget.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimativa de Gastos:</span>
                <span className="font-medium">
                  R$ {estimatedCost.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((estimatedCost / budget) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Saldo Disponível:</span>
                <span
                  className={`font-medium ${availableBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  R$ {availableBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Itens Cadastrados
          </h3>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <ShoppingCart className="w-20 h-20 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
            <p className="text-sm text-gray-600">Total de itens</p>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Itens em falta:</span>
                <span className="font-medium text-red-600">{missingItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Da lista:</span>
                <span className="font-medium">
                  {completionPercentage.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Legenda de Status
          </h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Estoque adequado
                </p>
                <p className="text-xs text-gray-500">
                  (Quantidade atual ≥ ideal)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Estoque médio
                </p>
                <p className="text-xs text-gray-500">
                  (Quantidade entre 30% e 99% do ideal)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Estoque baixo
                </p>
                <p className="text-xs text-gray-500">(Menos de 30% do ideal)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-gray-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Os itens com estoque baixo ou médio serão incluídos na lista
                  de compras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-row gap-4 justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col gap-4 w-full">
          <label
            htmlFor="category-filter"
            className="text-sm font-medium text-gray-700"
          >
            Filtrar por categoria:
          </label>
          <div className="flex flex-row gap-4 items-center justify-between w-full">
            <Select value={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="Alimentos">Alimentos</SelectItem>
                <SelectItem value="Limpeza">Limpeza</SelectItem>
                <SelectItem value="Higiene">Higiene</SelectItem>
              </SelectContent>
            </Select>
            <Button className="px-4 py-2 text-white rounded-lg text-sm ">
              Filtrar
            </Button>
            <Label className="flex items-center space-x-2 text-sm w-full">
              <input
                type="checkbox"
                checked={showOnlyMissing}
                onChange={(e) => setShowOnlyMissing(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-gray-700">
                Mostrar apenas itens em falta
              </span>
            </Label>

            <Button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm">
              <X className="w-4 h-4" />
              Limpar
            </Button>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Lista de Itens
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unid. Medida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd. Ideal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qtd. Atual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço est.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${getProgressColor(item.status)}`}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.idealQuantity.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.currentQuantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.status)}`}
                          style={{
                            width: `${Math.min((item.currentQuantity / item.idealQuantity) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${getStatusColor(item.status)}`}
                      >
                        {item.status === 'adequate'
                          ? 'Adequado'
                          : item.status === 'medium'
                            ? 'Médio'
                            : 'Baixo'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {item.estimatedPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleEditItem(item)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label={`Editar ${item.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Excluir ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ShoppingItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />
    </main>
  );
}

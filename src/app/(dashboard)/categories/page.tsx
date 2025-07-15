import { Breadcrumb } from '@/components/Breadcrumb';
import { Save } from 'lucide-react';
import { CategoryGrid } from './_components/CategoryGrid';
import { Header } from './_components/Header';

export default function CategoriesPage() {
  return (
    <main className="w-full px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-4">
      <Breadcrumb />
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciar Categorias
        </h1>
        <p className="text-gray-600 mb-8">
          Organize suas finanças com categorias personalizadas
        </p>

        <CategoryGrid />
      </div>
    </main>
  );
}

import { ChevronRight } from 'lucide-react';
import React from 'react';

export function Breadcrumb() {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Categorias', href: '/categorias' },
  ];

  return (
    <nav aria-label="Navegação estrutural" className="flex">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight
                className="w-4 h-4 text-gray-400 mr-2"
                aria-hidden="true"
              />
            )}
            <a
              href={breadcrumb.href}
              className={`
                ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-500 cursor-default'
                    : 'text-orange-600 hover:text-orange-700'
                }
              `}
              aria-current={
                index === breadcrumbs.length - 1 ? 'page' : undefined
              }
            >
              {breadcrumb.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

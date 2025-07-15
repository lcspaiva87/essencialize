import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const badgevariant = tv({
  base: 'rounded-full px-2 py-1 text-xs font-medium text-white flex items-center gap-2',
  variants: {
    status: {
      pago: 'border-green-500 border bg-transparent text-green-500',
      pendente: 'border-yellow-500 border-2 bg-transparent text-yellow-500',
      cancelado: 'border-red-500 border-2 bg-transparent text-red-500',
    },
  },
});
export const badgevariantRecurrent = tv({
  base: 'rounded-full  text-xs font-medium text-white flex items-center !w-12',
  variants: {
    status: {
      yes: 'bg-green-500 hover:bg-green-600 ',
      no: 'bg-red-500 hover:bg-red-600 ',
    },
  },
});

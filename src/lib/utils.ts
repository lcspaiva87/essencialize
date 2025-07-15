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
      pago: 'bg-green-500 ',
      pendente: 'bg-yellow-500 ',
      cancelado: 'bg-red-500 ',
    },
  },
});

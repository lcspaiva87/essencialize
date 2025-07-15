type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'currency';

interface SelectOption {
  value: string;
  label: string;
}
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[]; // Para campos select
  icon?: React.ReactNode; // Para campos com ícone
  description?: string; // Para acessibilidade
}

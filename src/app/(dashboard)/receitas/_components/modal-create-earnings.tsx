import { DollarSign, Wallet, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FieldType = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'currency'

interface SelectOption {
  value: string
  label: string
}

interface FormField {
  id: string
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: SelectOption[]
  icon?: React.ReactNode
  description?: string
}

interface FlexibleModalProps {
  buttonText: string
  buttonIcon?: React.ReactNode
  modalTitle?: string
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitButtonText?: string
  submitButtonIcon?: React.ReactNode
  bgColor?: string
}

export function ModalCustom({
  buttonText,
  buttonIcon,
  fields,
  onSubmit,
  submitButtonText = 'Salvar',
  bgColor = 'bg-primary',
}: FlexibleModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {}

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        data[field.name] = formData.has(field.name)
      } else {
        data[field.name] = formData.get(field.name)
      }
    })

    onSubmit(data)
  }

  const renderField = (field: FormField) => {
    const baseClasses = 'flex gap-2 flex-col'
    const fieldId = `${field.id}`
    const descId = `${field.id}-desc`

    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <fieldset className={baseClasses} key={field.id}>
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor={fieldId}
            >
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <Input
              aria-describedby={descId}
              className={field.type === 'date' ? 'text-gray-500' : ''}
              id={fieldId}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type}
            />
            {field.description && (
              <span className="sr-only" id={descId}>
                {field.description}
              </span>
            )}
          </fieldset>
        )

      case 'currency':
        return (
          <fieldset className={baseClasses} key={field.id}>
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor={fieldId}
            >
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <div className="relative flex w-full items-center">
              <div className="absolute left-3 text-gray-400">
                {field.icon || <Wallet className="h-4 w-4" />}
              </div>
              <div className="absolute inset-y-0 left-10 w-px bg-gray-300" />
              <Input
                aria-describedby={descId}
                className="w-full flex-grow py-2 pr-4 pl-14 transition-all duration-200 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={fieldId}
                name={field.name}
                placeholder={field.placeholder || 'R$ 0,00'}
                required={field.required}
                type="text"
              />
            </div>
            {field.description && (
              <span className="sr-only" id={descId}>
                {field.description}
              </span>
            )}
          </fieldset>
        )

      case 'select':
        return (
          <fieldset className={baseClasses} key={field.id}>
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor={fieldId}
            >
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <Select name={field.name} required={field.required}>
              <SelectTrigger aria-describedby={descId} id={fieldId}>
                <SelectValue
                  placeholder={field.placeholder || 'Selecione uma opção'}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <span className="sr-only" id={descId}>
                {field.description}
              </span>
            )}
          </fieldset>
        )

      case 'checkbox':
        return (
          <fieldset className="flex items-center gap-2" key={field.id}>
            <Input
              aria-describedby={descId}
              className="h-4 w-4"
              id={fieldId}
              name={field.name}
              type="checkbox"
            />
            <label
              className="font-medium text-gray-500 text-sm"
              htmlFor={fieldId}
            >
              {field.label}
            </label>
            {field.description && (
              <span className="sr-only" id={descId}>
                {field.description}
              </span>
            )}
          </fieldset>
        )

      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center gap-2 text-white">
          {buttonIcon && <>{buttonIcon}</>}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <DialogHeader className="relative z-10">
          <div className={`relative ${bgColor} overflow-hidden p-6`}>
            <DialogHeader className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <DialogTitle className="font-semibold text-white text-xl">
                    Nova Despesa
                  </DialogTitle>
                  <p className="text-sm text-white/80">
                    Adicione uma nova transação
                  </p>
                </div>
              </div>
            </DialogHeader>

            <Button
              className="absolute top-4 right-4 z-20 text-white/80 hover:bg-white/20 hover:text-white"
              size="icon"
              variant="ghost"
            >
              <X size={20} />
            </Button>

            {/* Decorative elements */}
            <div className="-translate-y-16 absolute top-0 right-0 h-32 w-32 translate-x-16 rounded-full bg-white/10" />
            <div className="-translate-x-12 absolute bottom-0 left-0 h-24 w-24 translate-y-12 rounded-full bg-white/5" />
          </div>
        </DialogHeader>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          {fields.map((field) => renderField(field))}

          <Button className="w-full text-white" type="submit">
            {buttonIcon}
            {submitButtonText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

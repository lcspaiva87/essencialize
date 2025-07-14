export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  subcategory?: string
  description: string
  date: string
  recurring?: boolean
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  tags?: string[]
  attachment?: string
  account?: string
  reconciled?: boolean
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  type: 'income' | 'expense'
  subcategories?: Category[]
  budget?: number
  spent?: number
}

export interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: 'low' | 'medium' | 'high'
  monthlySaving: number
  completed: boolean
  createdAt: string
}

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  bank: string
  lastSync: string
  active: boolean
}

export interface Budget {
  id: string
  category: string
  amount: number
  spent: number
  period: 'monthly' | 'yearly'
  alerts: boolean
  alertThreshold: number
}

export interface Report {
  id: string
  title: string
  type: 'monthly' | 'quarterly' | 'yearly'
  dateRange: {
    start: string
    end: string
  }
  data: unknown
  generatedAt: string
}

export interface WhatsAppMessage {
  id: string
  message: string
  type: 'user' | 'bot'
  timestamp: string
  processed?: boolean
  transactionId?: string
}

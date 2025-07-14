import { useMemo, useState } from 'react'
import type { Account, Category, Goal, Transaction } from '../types'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salário',
    description: 'Salário mensal',
    date: '2024-01-01',
    recurring: true,
    recurringFrequency: 'monthly',
    account: 'Conta Corrente',
    reconciled: true,
  },
  {
    id: '2',
    type: 'expense',
    amount: 800,
    category: 'Moradia',
    subcategory: 'Aluguel',
    description: 'Aluguel apartamento',
    date: '2024-01-05',
    recurring: true,
    recurringFrequency: 'monthly',
    tags: ['essencial'],
    reconciled: true,
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'Alimentação',
    subcategory: 'Supermercado',
    description: 'Compras semanais',
    date: '2024-01-10',
    tags: ['essencial', 'planejado'],
    reconciled: true,
  },
  {
    id: '4',
    type: 'expense',
    amount: 60,
    category: 'Transporte',
    subcategory: 'Combustível',
    description: 'Gasolina',
    date: '2024-01-12',
    tags: ['recorrente'],
    reconciled: true,
  },
  {
    id: '5',
    type: 'expense',
    amount: 300,
    category: 'Lazer',
    subcategory: 'Restaurantes',
    description: 'Jantar em família',
    date: '2024-01-15',
    tags: ['lazer', 'família'],
    reconciled: false,
  },
]

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Salário',
    color: '#10B981',
    icon: 'DollarSign',
    type: 'income',
    budget: 5000,
    spent: 5000,
  },
  {
    id: '2',
    name: 'Moradia',
    color: '#3B82F6',
    icon: 'Home',
    type: 'expense',
    budget: 1000,
    spent: 800,
  },
  {
    id: '3',
    name: 'Alimentação',
    color: '#F59E0B',
    icon: 'UtensilsCrossed',
    type: 'expense',
    budget: 400,
    spent: 150,
  },
  {
    id: '4',
    name: 'Transporte',
    color: '#8B5CF6',
    icon: 'Car',
    type: 'expense',
    budget: 200,
    spent: 60,
  },
  {
    id: '5',
    name: 'Lazer',
    color: '#EF4444',
    icon: 'Gamepad2',
    type: 'expense',
    budget: 300,
    spent: 300,
  },
]

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Reserva de Emergência',
    description: 'Guardar 6 meses de gastos essenciais',
    targetAmount: 15_000,
    currentAmount: 8500,
    deadline: '2024-12-31',
    category: 'Emergência',
    priority: 'high',
    monthlySaving: 1000,
    completed: false,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Viagem Europa',
    description: 'Economizar para viagem de 15 dias',
    targetAmount: 8000,
    currentAmount: 3200,
    deadline: '2024-07-15',
    category: 'Lazer',
    priority: 'medium',
    monthlySaving: 800,
    completed: false,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    title: 'Novo Carro',
    description: 'Entrada para carro novo',
    targetAmount: 20_000,
    currentAmount: 5000,
    deadline: '2025-06-01',
    category: 'Transporte',
    priority: 'medium',
    monthlySaving: 900,
    completed: false,
    createdAt: '2024-01-01',
  },
]

const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Conta Corrente',
    type: 'checking',
    balance: 2500,
    bank: 'Banco do Brasil',
    lastSync: '2024-01-20T10:30:00Z',
    active: true,
  },
  {
    id: '2',
    name: 'Poupança',
    type: 'savings',
    balance: 8500,
    bank: 'Banco do Brasil',
    lastSync: '2024-01-20T10:30:00Z',
    active: true,
  },
  {
    id: '3',
    name: 'Cartão de Crédito',
    type: 'credit',
    balance: -450,
    bank: 'Nubank',
    lastSync: '2024-01-20T09:15:00Z',
    active: true,
  },
]

export const useFinancialData = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions)
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [accounts] = useState<Account[]>(mockAccounts)
  const [loading] = useState(false)

  const totalBalance = useMemo(() => {
    return accounts.reduce((sum, account) => sum + account.balance, 0)
  }, [accounts])

  const monthlyIncome = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date)
        return (
          t.type === 'income' &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const monthlyExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return transactions
      .filter((t) => {
        const transactionDate = new Date(t.date)
        return (
          t.type === 'expense' &&
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        )
      })
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const expensesByCategory = useMemo(() => {
    const categoryTotals = new Map<string, number>()

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const current = categoryTotals.get(t.category) || 0
        categoryTotals.set(t.category, current + t.amount)
      })

    return Array.from(categoryTotals.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        color: categories.find((c) => c.name === category)?.color || '#6B7280',
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions, categories])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'completed'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal))
    )
  }

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...updates } : category
      )
    )
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id))
  }

  return {
    transactions,
    categories,
    goals,
    accounts,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    expensesByCategory,
    loading,
    addTransaction,
    addGoal,
    updateGoal,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}

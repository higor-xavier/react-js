import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  // Vamos usar um estado para armazenar e mostrar as informações obtidas da API
  // Sempre lembrar de tipar os estados no react
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Sempre que o componente entrar em um novo fluxo de renderização, o fetch será executado.
  // Sendo assim, faz-se necessário acrescentar o useEffect com array de dependências vazio
  // para que seja executado apenas uma vez

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      // necessário await, para não haver promise de response
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    // [vazio] faz com que essa função não seja recriada em memória
    // se a função interna precisar de informações de fora,
    // deve haver de forma explícita no array de dependência para
    // que não seja utilizada a informação desatualizada da variável
    // já que se utiliza a informação armazenada em memória anteriormente
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

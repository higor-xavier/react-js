import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
    // Vamos usar um estado para armazenar e mostrar as informações obtidas da API
    // Sempre lembrar de tipar os estados no react
    const [transactions, setTransactions] = useState<Transaction[]>([])

    // Sempre que o componente entrar em um novo fluxo de renderização, o fetch será executado.
    // Sendo assim, faz-se necessário acrescentar o useEffect com array de dependências vazio
    // para que seja executado apenas uma vez

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', { // necessário await, para não haver promise de response
            params: {
                q: query,
            }
        })
        
        setTransactions(response.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []) 

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}
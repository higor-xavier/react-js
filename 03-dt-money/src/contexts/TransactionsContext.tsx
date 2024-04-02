import { ReactNode, createContext, useEffect, useState } from "react";

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
        const url = new URL('http://localhost:3000/transactions');

        if (query) {
            url.searchParams.append('q', query);
        }

        const response = await fetch(url)
        const data = await response.json();

        setTransactions(data);
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
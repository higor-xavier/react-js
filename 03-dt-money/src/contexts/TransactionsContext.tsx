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
    transactions: Transaction[]
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

    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/transactions')
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, []) 

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {

    interface Transaction {
        id: number;
        description: string;
        type: 'income' | 'outcome';
        price: number;
        category: string;
        createdAt: string;
    }

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
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.price}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}
import * as Dialog from "@radix-ui/react-dialog"
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"

export function NewTransactionModal() {
    return (
        // O 'Portal' tem a funcionalidade de transportar a informação
        // do modal para outro local, uma vez que o modal não pertence
        // aos elementos onde está inserido. Ele está sobre esses 
        // elementos
        <Dialog.Portal>
            {/* O overlay é só o background transparente mesmo */}
            <Overlay />

            {/* Conteúdo do modal */}
            <Content>
                {/* Importante adicionar o title para os leitores de tela */}
                <Dialog.Title>Nova transação</Dialog.Title>

                {/* Botão de fechar o modal */}
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form action="">
                    <input type="text" placeholder="Descrição" required />
                    <input type="number" placeholder="Preço" required />
                    <input type="text" placeholder="Categoria" required />

                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}
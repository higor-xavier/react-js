import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles"
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />

                <Dialog.Root>
                    {/* O trigger é responsável por abrir o modal */}
                    {/* Nesse caso, a propriedade 'asChild' "passa" essa função 
                        pro componente interno
                    */}
                    <Dialog.Trigger asChild>
                        <NewTransactionsButton>Nova transação</NewTransactionsButton>
                    </Dialog.Trigger>

                    {/* O 'Portal' tem a funcionalidade de transportar a informação
                        do modal para outro local, uma vez que o modal não pertence
                        aos elementos onde está inserido. Ele está sobre esses 
                        elementos
                    */}
                    <Dialog.Portal>
                        {/* O overlay é só o background transparente mesmo */}
                        <Dialog.Overlay />

                        {/* Conteúdo do modal */}
                        <Dialog.Content>
                            {/* Importante adicionar o title para os leitores de tela */}
                            <Dialog.Title>Nova transação</Dialog.Title>
                            <Dialog.Close />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}
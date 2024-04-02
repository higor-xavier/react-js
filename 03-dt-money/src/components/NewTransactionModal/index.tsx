import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import * as z from 'zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
    const { 
        control, //útil para receber informações de estruturas que não são nativas do HTML
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema), 
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: newTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(data);
    }

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

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')} 
                    />
                    <input 
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', { valueAsNumber: true })} 
                    />
                    <input 
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')} 
                    />

                    <Controller 
                        control={control}
                        name="type"
                        //render retorna o conteúdo relacionado ao name, no caso type
                        render={({ field }) => {  //field fornece informações mais específicas sobre o campo em uso
                            return (
                                <TransactionType 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                >
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}  
                    />

                    <button type="submit" disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}
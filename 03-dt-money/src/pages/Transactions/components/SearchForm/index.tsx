import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

// Razões para a renderização de um componente:
// - Hooks changed (mudou estado, contexto, reducer);
// - Props changed (mudou propriedades);
// - Parent rendered (componente pai renderizou);
//
// Fluxo de renderização:
// 1. O React recria o HTML da interface daquele componente
// 2. Compara a versão do HTML recriada com a versão anterior
// 3. Se houve mudança, ele reescreve o HTML na tela
//
// Memo(opera antes dos passos do fluxo de renderização padrão):
// 0. Hooks changed, Props changed (deep comparisson)
// 0.1 . Comparar a versão anterior dos hooks e props
// 0.2 . SE algo mudar, ele permite a nova renderização do componente
//       caindo assim, em um fluxo padrão.

const searchFormSchema = z.object({
  query: z.string(),
})

type SeachFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }, // booleano que demonstra conclusão do envio das informações do form
  } = useForm<SeachFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SeachFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

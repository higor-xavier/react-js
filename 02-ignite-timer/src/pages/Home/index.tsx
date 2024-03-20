import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // conexão do hookform com o validador de campos zod
import * as zod from 'zod' // usando o operador * do ecmascript para essa biblioteca que não possui export default
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

// controlled: mantém em tempo real a informação do input do usuário guardada no estado da aplicação
// uncontrolled: a informação do input só é buscada quando é necessária

// Prop Drilling -> Quando há muitas propriedades APENAS para comunicação entre componentes
// Context API como solução para o prop drilling
// Context API -> Permite compartilhar informações entre VÁRIOS componentes ao mesmo tempo

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Variável que guarda o ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    // Guardando o ID com o valor em milissegundos da data no momento da adição da tarefa
    const id = String(new Date().getTime())

    // Criando novo ciclo
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // Sempre que uma alteração de estado depender da anterior, deve-se usar o formato de arrowfunction
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  // Quantidade de segundos atualizado sem o valor de segundos passados
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Pegando o valor da divisão dos segundos atualizados por 60 arredondado para menos, retirando o valor dos minutos
  const minutesAmount = Math.floor(currentSeconds / 60)
  // O valor dos segundos é o resto do valor dos segundos atualizados dividido por 60
  const secondsAmount = currentSeconds % 60

  // Os caracteres, quando abaixo de 10, devem apresentar o '0' como primeiro algarismo na interface
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

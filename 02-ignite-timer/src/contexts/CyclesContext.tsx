import { ReactNode, createContext, useState, useReducer } from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'
// Use reducer para armazenar informações complexas.
// Geralmente, essas informações precisam ser alteradas futuramente.
// Útil lembrar que o reducer serve como um local fixo para todas alterações
// que podem ocorrer dentro de um estado de um componente

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // o primeiro parâmetro, sendo uma função, recebe dois parâmetros(state, action)
  // o state -> valor atual da variável de estado, nesse caso o 'cycle'
  // a action -> é a definição da ação que irá alterar a variável de estado
  // useReducer((função(state, action)), valor-inicial-da-variavél) -- nesse caso é o cycles
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  // Guardando quantidade de tempo que levou da definição até a execução
  // do ciclo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  // Variável que guarda o ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
  }

  function createNewCycle(data: CreateCycleData) {
    // Guardando o ID com o valor em milissegundos da data no momento da adição
    // da tarefa
    const id = String(new Date().getTime())

    // Criando novo ciclo
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    // Sempre que uma alteração de estado depender da anterior, deve-se usar o
    // formato de arrowfunction
    // setCycles((state) => [...state, newCycle])

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

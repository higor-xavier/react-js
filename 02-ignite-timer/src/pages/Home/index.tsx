import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // conexão do hookform com o validador de campos zod
import * as zod from 'zod' // usando o operador * do ecmascript para essa biblioteca que não possui export default
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'

// controlled: mantém em tempo real a informação do input do usuário guardada no estado da aplicação
// uncontrolled: a informação do input só é buscada quando é necessária

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

// automatizando definição da tipagem dos dados do form
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Guardando quantidade de tempo que levou da definição até a execução do ciclo
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // Variável que guarda o ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

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

    reset()
  }

  // Salvando nessa variável o valor em segundos da quantidade de minutos do ciclo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // Quantidade de segundos atualizado sem o valor de segundos passados
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Pegando o valor da divisão dos segundos atualizados por 60 arredondado para menos, retirando o valor dos minutos
  const minutesAmount = Math.floor(currentSeconds / 60)
  // O valor dos segundos é o resto do valor dos segundos atualizados dividido por 60
  const secondsAmount = currentSeconds % 60

  // Os caracteres, quando abaixo de 10, devem apresentar o '0' como primeiro algarismo na interface
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Banana"></option>
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}

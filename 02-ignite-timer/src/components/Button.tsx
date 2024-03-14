import { ButtonContainer, ButtonVariant } from './Button.styles'

// Aqui é feita a importação das variações de cores
interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}

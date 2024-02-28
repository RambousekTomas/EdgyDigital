import { Text } from '../../text/Text'

interface IdentificationProps {
  id: number
}

export const Identification = ({ id }: IdentificationProps) => {
  return <Text variant="body">#{id}</Text>
}

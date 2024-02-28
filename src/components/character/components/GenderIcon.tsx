import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

interface GenderIconProps {
  gender: string
}

export const GenderIcon = ({ gender }: GenderIconProps) => {
  return <MCIcon name={getGenderIconName(gender)} color={'black'} size={20} />
}

const getGenderIconName = (gender: string): string => {
  if (gender === 'Male') return 'gender-male'
  if (gender === 'Female') return 'gender-female'
  return 'head-question'
}

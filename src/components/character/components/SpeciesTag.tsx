import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { colors } from '../../../styles'
import { Text } from '../../text/Text'

interface SpeciesTagProps {
  species: string
}

export const SpeciesTag = ({ species }: SpeciesTagProps) => {
  return (
    <Text variant="body" style={[styles.species, getSpeciesBGColor(species)]}>
      {species}
    </Text>
  )
}

const styles = StyleSheet.create({
  species: {
    color: colors.text.light,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
})

const speaciesColors = {
  Human: '#73B340',
  Alien: '#FF5646',
  unknown: '#A4ACAF',
}

const getSpeciesBGColor = (species: string): StyleProp<TextStyle> => {
  if (species === 'Human') return { backgroundColor: speaciesColors.Human }
  if (species === 'Alien') return { backgroundColor: speaciesColors.Alien }
  return { backgroundColor: speaciesColors.unknown }
}

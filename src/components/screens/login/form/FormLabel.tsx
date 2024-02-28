/* eslint-disable no-restricted-imports */
import { StyleSheet, Text } from 'react-native'
import { colors, fontWeights, fontSizes } from '../../../../styles'

interface FormLabelProps {
  text: string
}

export const FormLabel = ({ text }: FormLabelProps) => {
  return <Text style={styles.label}>{text}</Text>
}

const styles = StyleSheet.create({
  label: {
    color: colors.text.dark,
    fontSize: fontSizes.formLabel,
    fontWeight: fontWeights.medium,
    textTransform: 'capitalize',
  },
})

/* eslint-disable no-restricted-imports */
import { StyleSheet, Text } from 'react-native'
import { colors, fontWeights, fontSizes } from '../../../../styles'

interface FormErrorProps {
  text?: string
}

export const FormError = ({ text }: FormErrorProps) => {
  if (!text) return null

  return <Text style={styles.errorText}>{text}</Text>
}

export default FormError

const styles = StyleSheet.create({
  errorText: {
    color: colors.error.main,
    fontSize: fontSizes.formError,
    fontweight: fontWeights.normal,
  },
})

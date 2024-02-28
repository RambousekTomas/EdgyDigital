import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { colors, fontSizes, fontWeights } from '../../../../styles'

type FormInputProps = TextInputProps

const FormInput = (props: FormInputProps) => {
  const inputStyle = [styles.input, props.style]

  return <TextInput style={inputStyle} {...props} />
}

const styles = StyleSheet.create({
  input: {
    fontSize: fontSizes.formInput,
    fontWeight: fontWeights.medium,
    backgroundColor: colors.background.main,
    height: 36,
    borderRadius: 4,
    marginVertical: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
})

export default FormInput

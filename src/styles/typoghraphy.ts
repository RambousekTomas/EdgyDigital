import { StyleSheet } from 'react-native'
import { colors } from './colors'
import { fontSizes } from './fontSizes'
import { fontWeights } from './fontWeights'

export const typographyStyles = StyleSheet.create({
  body: {
    color: colors.text.main,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.normal,
  },
  title: {
    color: colors.text.dark,
    fontSize: fontSizes.title,
    fontWeight: fontWeights.semiBold,
  },
  button: {
    color: colors.text.dark,
    fontSize: fontSizes.button,
    fontWeight: '700',
  },
})

/* eslint-disable no-restricted-imports */
import React from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import { typographyStyles } from '../../styles'

interface TextProps extends RNTextProps {
  children: React.ReactNode
  variant: keyof typeof typographyStyles
  style?: StyleProp<TextStyle>
}

export const Text = ({ variant, style, ...props }: TextProps) => {
  const mergedStyle = [typographyStyles[variant], style]
  return <RNText style={mergedStyle} {...props} />
}

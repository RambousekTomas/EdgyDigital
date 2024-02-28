/* eslint-disable react-native/no-unused-styles */
import React from 'react'
import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native'
import { colors } from '../../styles'

interface IconButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined
  children: React.ReactNode
  size?: number
}

const IconButton = ({ onPress, children, size }: IconButtonProps) => {
  const styles = createStyles(size)

  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
      android_ripple={{
        color: colors.ripple.main,
      }}
    >
      {children}
    </Pressable>
  )
}

export default IconButton

const createStyles = (size?: number) =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      ...(size ? { height: size, width: size } : {}),
    },
  })

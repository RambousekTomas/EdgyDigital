import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { colors } from '../../../styles/colors'

interface MenuButtonProps {
  onPress: () => void
  children: React.ReactNode
}

export const MenuButton = ({ onPress, children }: MenuButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: colors.ripple.main,
      }}
      style={styles.button}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
})

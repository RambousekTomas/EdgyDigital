import React from 'react'
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from '../text/Text'
import { colors } from '../../styles'

interface ButtonProps {
  title: string
  onPress: ((event: GestureResponderEvent) => void) | null | undefined
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <View style={styles.buttonView}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.ripple.main }}
        style={styles.pressable}
      >
        <Text variant="button">{title}</Text>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  buttonView: {
    height: 40,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  pressable: {
    height: 40,
    backgroundColor: colors.background.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
})

import React from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from '../../text/Text'

interface CharacterNameProps {
  name: string
  style?: StyleProp<TextStyle>
}

export const CharacterName = ({ name, style }: CharacterNameProps) => {
  const mergedStyle = [styles.characterName, style]
  return (
    <Text variant="title" style={mergedStyle}>
      {name}
    </Text>
  )
}

const styles = StyleSheet.create({
  characterName: {
    textAlign: 'center',
  },
})

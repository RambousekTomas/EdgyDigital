import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '../../text/Text'
import { OriginOrLocation } from '../../../types/Types'

interface LastLocationProps {
  location: OriginOrLocation
}

export const LastLocation = ({ location }: LastLocationProps) => {
  return (
    <View>
      <Text variant="title" style={styles.title}>
        Last known location:
      </Text>
      <Text variant="body">{location.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
})

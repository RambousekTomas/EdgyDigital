import React, { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['rgb(186 208 3)', 'rgb(115 179 64)']}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  )
}

export default Layout

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 16,
  },
})

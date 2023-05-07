import { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Menu = () => {
  // TODO: Add redux
  const onPressLogout = useCallback(() => {
    // redux logout
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Pressable onPress={onPressLogout} style={styles.logoutBtn}>
        <MCIcon name="logout" size={32} />
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
})

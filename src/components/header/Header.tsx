import { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppSelector } from '../../store/hooks/Hooks'
import { selectName } from '../../store/slices/UserSlice'
import { useMenuDrawerContext } from '../menu/MenuDrawer'

const Header = () => {
  const userName = useAppSelector(selectName)
  const menuDrawer = useMenuDrawerContext()

  return (
    <View style={styles.header}>
      <Pressable
        onPress={menuDrawer.openDrawer}
        style={styles.munuButton}
        android_ripple={{
          color: 'rgba(125, 140, 1, 0.7)',
        }}
      >
        <MCIcon name="menu" size={32} color="black" />
      </Pressable>
      <Text style={styles.userName}>{userName}</Text>
    </View>
  )
}

export default memo(Header)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: 'rgb(186 208 3)',
    paddingHorizontal: 8,
    elevation: 4,
  },
  munuButton: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  userName: {
    flex: 1,
    textAlignVertical: 'center',
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
})

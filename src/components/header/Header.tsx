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
      <Pressable onPress={menuDrawer.openDrawer} style={styles.munuBtn}>
        <MCIcon name="menu" size={32} />
      </Pressable>
      <Text style={styles.userName}>{userName}</Text>
    </View>
  )
}

export default memo(Header)

// TODO: polish styles for shadows + add ios
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: 'white',
    elevation: 4,
  },
  munuBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRightWidth: 1,
    borderColor: 'hsla(0, 0%, 0%, 0.20)',
  },
  userName: {
    flex: 1,
    textAlignVertical: 'center',
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

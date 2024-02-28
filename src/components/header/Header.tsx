import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppSelector } from '../../store/hooks/Hooks'
import { selectUsername } from '../../store/slices/UserSlice'
import { useMenuDrawerContext } from '../menu/MenuDrawer'
import { Text } from '../text/Text'
import IconButton from '../buttons/IconButton'
import { colors } from '../../styles/colors'

const Header = () => {
  const username = useAppSelector(selectUsername)
  const menuDrawer = useMenuDrawerContext()

  return (
    <View style={styles.header}>
      <IconButton onPress={menuDrawer.openDrawer} size={48}>
        <MCIcon name="menu" size={32} color="black" />
      </IconButton>
      <View style={styles.username}>
        <Text variant="title">{username}</Text>
      </View>
    </View>
  )
}

export default memo(Header)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: colors.background.main,
    paddingHorizontal: 4,
    elevation: 4,
  },
  username: {
    paddingLeft: 4,
    justifyContent: 'center',
  },
})

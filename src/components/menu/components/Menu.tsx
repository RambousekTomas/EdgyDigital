import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppDispatch } from '../../../store/hooks/Hooks'
import { logoutThunk } from '../../../store/thunks/LogoutThunk'
import { colors } from '../../../styles/colors'
import { sharedStyles } from '../../../styles/styles'
import { Text } from '../../text/Text'
import { useMenuDrawerContext } from '../MenuDrawer'
import { MenuButton } from './MenuButton'
import { MenuLogo } from './MenuLogo'

const Menu = () => {
  const dispatch = useAppDispatch()
  const { closeDrawer } = useMenuDrawerContext()

  const onPressLogout = () => {
    dispatch(logoutThunk())
    closeDrawer()
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#ffffff', '#fffefa']}
      style={sharedStyles.flex}
    >
      <View style={styles.logoContainer}>
        <MenuLogo />
      </View>
      <MenuButton onPress={onPressLogout}>
        <MCIcon style={styles.menuIcon} name="logout" size={28} />
        <Text variant="title">Logout</Text>
      </MenuButton>
    </LinearGradient>
  )
}

export default Menu

const styles = StyleSheet.create({
  logoContainer: {
    height: 48,
    padding: 4,
    backgroundColor: colors.background.main,
    elevation: 4,
  },
  menuIcon: {
    color: colors.text.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
})

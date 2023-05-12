import { useCallback } from 'react'
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppDispatch } from '../../store/hooks/Hooks'
import { revoke_authorization } from '../../store/slices/UserSlice'
import { useMenuDrawerContext } from './MenuDrawer'

const Menu = () => {
  const dispatch = useAppDispatch()
  const { closeDrawer } = useMenuDrawerContext()

  const onPressLogout = useCallback(() => {
    dispatch(revoke_authorization())
    closeDrawer()
  }, [closeDrawer, dispatch])
  return (
    <>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('../../assests/images/Rick_and_Morty_logo_PNG3.png') as ImageSourcePropType
          }
        />
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['rgb(186 208 3)', 'rgb(115 179 64)']}
        style={styles.container}
      >
        <View style={styles.item}>
          <Pressable
            onPress={onPressLogout}
            android_ripple={{
              color: 'rgba(125, 140, 1, 0.7)',
            }}
            style={styles.logoutBtn}
          >
            <MCIcon style={styles.itemIcon} name="logout" size={28} />
            <Text style={styles.itemText}>Logout</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(192,212,28)',
  },
  logoContainer: {
    height: 48,
    padding: 4,
    backgroundColor: 'rgb(186 208 3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(153,169,22)',
    elevation: 4,
  },
  logo: {
    height: 40,
    width: '100%',
  },
  item: {
    height: 48,
    justifyContent: 'center',
    marginVertical: 8,
  },
  itemText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  itemIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    color: 'black',
  },
  logoutBtn: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
})

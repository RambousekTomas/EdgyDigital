/* eslint-disable @typescript-eslint/no-var-requires */
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import LoginForm from './form/LoginForm'

const LoginScreen = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['rgb(186 208 3)', 'rgb(115 179 64)']}
      style={styles.gradient}
    >
      <View style={styles.imageView}>
        <Image
          style={styles.imageLogo}
          resizeMode="contain"
          source={
            require('../../../assests/images/Rick_and_Morty_logo_PNG3.png') as ImageSourcePropType
          }
        />
        <Image
          style={styles.imagePortal}
          resizeMode="contain"
          source={
            require('../../../assests/images/PortalTransparentBG.png') as ImageSourcePropType
          }
        />
      </View>
      <LoginForm />
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 36,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePortal: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 50,
  },
  imageLogo: {
    marginTop: -80,
    width: '100%',
    height: 200,
  },
})

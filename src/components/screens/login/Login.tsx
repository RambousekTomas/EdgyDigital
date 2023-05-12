/* eslint-disable @typescript-eslint/no-var-requires */
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import Layout from '../../layout/Layout'
import LoginForm from './form/LoginForm'
//TODO fix styles for smaller screens
const LoginScreen = () => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  imagePortal: {
    width: '70%',
    height: '60%',
  },
  imageLogo: {
    width: '100%',
    height: '40%',
  },
})

/* eslint-disable @typescript-eslint/no-var-requires */
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import Layout from '../../layout/Layout'
import Spinner from '../../spinner/Spinner'

const SplashScreen = () => {
  return (
    <Layout>
      <View style={styles.centerContainer}>
        <Image
          style={styles.imageLogo}
          resizeMode="contain"
          source={
            require('../../../assests/images/Rick_and_Morty_logo_PNG3.png') as ImageSourcePropType
          }
        />
        <Spinner size={48} />
      </View>
    </Layout>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: '100%',
    height: '40%',
  },
})

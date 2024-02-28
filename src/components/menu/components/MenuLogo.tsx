import { Image, ImageSourcePropType, StyleSheet } from 'react-native'

export const MenuLogo = () => {
  return (
    <Image
      style={styles.logo}
      resizeMode="contain"
      source={
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('../../../assests/images/Rick_and_Morty_logo_PNG3.png') as ImageSourcePropType
      }
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: '100%',
  },
})

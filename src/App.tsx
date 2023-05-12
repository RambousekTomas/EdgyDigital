import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import MenuDrawer from './components/menu/MenuDrawer'
import SplashScreen from './components/screens/splash/Splash'
import Navigation from './routes/Navigation'
import { store } from './store/Store'

const App = () => {
  const isLoading = false

  if (isLoading) return <SplashScreen />

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.flex}>
        <GestureHandlerRootView style={styles.flex}>
          <MenuDrawer>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </MenuDrawer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  flex: { flex: 1 },
})

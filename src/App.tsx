import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MenuDrawer from './components/menu/MenuDrawer'
import SplashScreen from './components/screens/splash/Splash'
import Navigation from './routes/Navigation'
import store, { persistor } from './store/Store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <SafeAreaView style={styles.flex}>
          <GestureHandlerRootView style={styles.flex}>
            <MenuDrawer>
              <NavigationContainer>
                <StatusBar backgroundColor={'rgb(186 208 3)'} />
                <Navigation />
              </NavigationContainer>
            </MenuDrawer>
          </GestureHandlerRootView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  flex: { flex: 1 },
})

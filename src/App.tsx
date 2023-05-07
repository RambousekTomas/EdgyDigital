import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import SplashScreen from './components/screens/splash/Splash'
import Navigation from './routes/Navigation'
import { store } from './store/Store'

const App = () => {
  const isLoading = false

  if (isLoading) return <SplashScreen />

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.flex}>
              <Navigation isUserAtuhorized={false} />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  flex: { flex: 1 },
})

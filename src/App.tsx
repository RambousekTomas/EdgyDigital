import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MenuDrawer from './components/menu/MenuDrawer'
import SplashScreen from './components/screens/splash/Splash'
import Navigation from './routes/Navigation'
import store, { persistor } from './store/Store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sharedStyles } from './styles'

const queryClient = new QueryClient()

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <SafeAreaView style={sharedStyles.flex}>
            <GestureHandlerRootView style={sharedStyles.flex}>
              <MenuDrawer>
                <NavigationContainer>
                  <StatusBar />
                  <Navigation />
                </NavigationContainer>
              </MenuDrawer>
            </GestureHandlerRootView>
          </SafeAreaView>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  )
}

export default App

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useCallback } from 'react'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/header/Header'
import FavouritesScreen from '../components/screens/favourites/Favourites'
import LoginScreen from '../components/screens/login/Login'
import MainScreen from '../components/screens/main/Main'
import ScanScreen from '../components/screens/scan/Scan'
import { useAppSelector } from '../store/hooks/Hooks'
import { selectIsAuthorized } from '../store/slices/UserSlice'

export type AuthStackParams = {
  login: undefined
}

export type TabParams = {
  favourites: undefined
  main: undefined
  scan: undefined
}

const Tab = createBottomTabNavigator<TabParams>()
const AuthStack = createStackNavigator<AuthStackParams>()

const Navigation = () => {
  const isUserAtuhorized = useAppSelector(selectIsAuthorized)
  const header = useCallback(() => <Header />, [])

  return (
    <>
      {!isUserAtuhorized ? (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="login" component={LoginScreen} />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            header,
            tabBarStyle: { backgroundColor: 'rgb(186 208 3)' },
            tabBarInactiveTintColor: '#888888',
            tabBarActiveTintColor: '#333333',
            tabBarLabelStyle: { fontSize: 14 },
          }}
        >
          <Tab.Screen
            name="main"
            component={MainScreen}
            options={{
              tabBarLabel: 'Main',
              tabBarIcon: ({ color, size }) => (
                <MCIcon
                  name="format-list-bulleted-square"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="scan"
            component={ScanScreen}
            options={{
              tabBarLabel: 'Scan',
              tabBarIcon: ({ color, size }) => (
                <MCIcon name="qrcode-scan" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="favourites"
            component={FavouritesScreen}
            options={{
              tabBarLabel: 'Favourites',
              tabBarIcon: ({ color, size }) => (
                <MCIcon name="star-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </>
  )
}

export default Navigation

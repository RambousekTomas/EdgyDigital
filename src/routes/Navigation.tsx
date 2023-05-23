import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack'
import { useCallback } from 'react'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/header/Header'
import CharacterDetailScreen from '../components/screens/characterDetail/CharacterDetail'
import FavouritesScreen from '../components/screens/favourites/Favourites'
import LoginScreen from '../components/screens/login/Login'
import MainScreen from '../components/screens/main/Main'
import ScanScreen from '../components/screens/scan/Scan'
import { useAppSelector } from '../store/hooks/Hooks'
import { selectIsAuthorized } from '../store/slices/UserSlice'
import { Character } from '../types/Types'

export type AuthStackParams = {
  login: undefined
}

export type TabParams = {
  favourites: undefined
  main: undefined
  scan: undefined
}

export type MainStackParams = {
  characters: undefined
  characterDetail: { character: Character }
}

const Tab = createBottomTabNavigator<TabParams>()
const AuthStack = createStackNavigator<AuthStackParams>()
const MainStack = createStackNavigator<MainStackParams>()

const MainStackScreens = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="characters" component={MainScreen} />
      <MainStack.Screen
        name="characterDetail"
        component={CharacterDetailScreen}
        options={{
          presentation: 'transparentModal',
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
    </MainStack.Navigator>
  )
}

const Navigation = () => {
  const isUserAtuhorized = useAppSelector(selectIsAuthorized)
  const header = useCallback(() => <Header />, [])

  return (
    <>
      {isUserAtuhorized ? (
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
            component={MainStackScreens}
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

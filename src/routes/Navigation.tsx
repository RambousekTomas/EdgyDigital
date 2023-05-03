import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FavouritesScreen from '../components/screens/favourites/Favourites'
import LoginScreen from '../components/screens/login/Login'
import MainScreen from '../components/screens/main/Main'
import ScanScreen from '../components/screens/scan/Scan'

export type AuthStackParams = {
  login: undefined
}

export type TabParams = {
  favourites: undefined
  main: undefined
  scan: undefined
}

export type NavigationProps = {
  isUserAtuhorized: boolean
}

const Tab = createBottomTabNavigator<TabParams>()
const AuthStack = createStackNavigator<AuthStackParams>()

const Navigation = ({ isUserAtuhorized }: NavigationProps) => {
  return (
    <>
      {isUserAtuhorized ? (
        <AuthStack.Navigator>
          <AuthStack.Screen name="login" component={LoginScreen} />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator>
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

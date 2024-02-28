import { Platform } from 'react-native'
import {
  PERMISSIONS,
  Permission,
  check,
  request,
} from 'react-native-permissions'

export const requestCameraPermission = async () => {
  let cameraPermission: Permission = PERMISSIONS.ANDROID.CAMERA
  if (Platform.OS === 'android') cameraPermission = PERMISSIONS.ANDROID.CAMERA
  if (Platform.OS === 'ios') cameraPermission = PERMISSIONS.IOS.CAMERA
  const cameraPermissionStatus = await check(cameraPermission)
  if (cameraPermissionStatus === 'granted') return true
  if (
    cameraPermissionStatus === 'limited' ||
    cameraPermissionStatus === 'unavailable'
  )
    return false

  const newCameraPermission = await request(cameraPermission)
  return newCameraPermission === 'granted'
}

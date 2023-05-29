import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import {
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera'
import {
  PERMISSIONS,
  Permission,
  check,
  request,
} from 'react-native-permissions'
import { useFetchCharacter } from '../../../api/Requests'
import Layout from '../../layout/Layout'
import Spinner from '../../spinner/Spinner'
import DetailCard from './detailCard/DetailCard'

const requestCameraPermission = async () => {
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

const ScanScreen = () => {
  const [canUseCamera, setCanUseCamera] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [scanning, setScanning] = useState<true | undefined>(true)

  const { character, isFetching, fetchCharacter } = useFetchCharacter()
  const onBarCodeScanned = useCallback(
    ({ barcodes }: GoogleVisionBarcodesDetectedEvent) => {
      const filteredBarcodes = barcodes.filter((barcode) =>
        barcode.data.match(
          '^https://rickandmortyapi.com/api/character/[0-9]+$',
        ),
      )

      if (filteredBarcodes.length) {
        setScanning(undefined)
        fetchCharacter(filteredBarcodes[0].data)
        bottomSheetRef.current?.expand()
      }
    },
    [],
  )

  useEffect(() => {
    void requestCameraPermission().then((result) => {
      setCanUseCamera(result)
      setIsLoading(false)
    })
  }, [])

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '80%'], [])

  const onCloseStartScanning = useCallback(() => {
    setScanning(true)
  }, [])

  if (isLoading)
    return (
      <Layout>
        <Spinner size={40} />
      </Layout>
    )
  if (!canUseCamera)
    return (
      <Layout>
        <Text>Unable to use camera</Text>
      </Layout>
    )

  return (
    <>
      <Layout>
        <RNCamera
          style={styles.camera}
          onGoogleVisionBarcodesDetected={scanning && onBarCodeScanned}
          googleVisionBarcodeType={
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }
          captureAudio={false}
        />
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          backgroundColor: '#FED54A',
        }}
        onClose={onCloseStartScanning}
      >
        {!scanning && (
          <>
            {isFetching && <Spinner size={40} />}
            <BottomSheetScrollView>
              {character && <DetailCard character={character} />}
            </BottomSheetScrollView>
          </>
        )}
      </BottomSheet>
    </>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
  },
})

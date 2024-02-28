import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import { useEffect, useRef, useState } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import {
  GoogleVisionBarcodesDetectedEvent,
  RNCamera,
} from 'react-native-camera'
import { fetchCharacter } from '../../../api/Requests'
import { colors } from '../../../styles/colors'
import { requestCameraPermission } from '../../../utils/requestCameraPermission'
import Button from '../../buttons/Button'
import CharacterCard from '../../character/CharacterCard'
import Layout from '../../layout/Layout'
import Spinner from '../../spinner/Spinner'
import { Text } from '../../text/Text'

const SNAP_POINTS = ['90%']

const ScanScreen = () => {
  const [canUseCamera, setCanUseCamera] = useState(false)
  const [isLoadingScanner, setIsLoadingScanner] = useState(true)
  const [scanning, setScanning] = useState(true)
  const [characterUrl, setCharacterUrl] = useState<string>('')

  const { data: character, isFetching } = useQuery({
    queryKey: ['character', characterUrl],
    queryFn: () => fetchCharacter(characterUrl),
    enabled: isNotNilOrEmpty(characterUrl),
  })

  const onBarCodeScanned = ({
    barcodes,
  }: GoogleVisionBarcodesDetectedEvent) => {
    const filteredBarcodes = barcodes.filter((barcode) =>
      barcode.data.match('^https://rickandmortyapi.com/api/character/[0-9]+$'),
    )

    if (filteredBarcodes.length) {
      setScanning(false)
      setCharacterUrl(filteredBarcodes[0].data)
      bottomSheetRef.current?.expand()
    }
  }

  useEffect(() => {
    void requestCameraPermission().then((result) => {
      setCanUseCamera(result)
      setIsLoadingScanner(false)
    })
  }, [])

  const bottomSheetRef = useRef<BottomSheet>(null)

  const onCloseStartScanning = () => setScanning(true)

  const openAppSettings = () => void Linking.openSettings()

  if (isLoadingScanner)
    return (
      <Layout>
        <Spinner size={40} />
      </Layout>
    )
  if (!canUseCamera)
    return (
      <Layout>
        <View style={styles.rowGap}>
          <Text variant="body">
            Scanning is not allowed due to missing camera permission. To allow
            scanning enable permission to use camera.
          </Text>
          <Button title="App settings" onPress={openAppSettings} />
        </View>
      </Layout>
    )

  return (
    <>
      <Layout>
        <RNCamera
          style={styles.camera}
          onGoogleVisionBarcodesDetected={
            scanning ? onBarCodeScanned : undefined
          }
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
        snapPoints={SNAP_POINTS}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        onClose={onCloseStartScanning}
      >
        {!scanning && (
          <>
            {isFetching && <Spinner size={40} />}
            <BottomSheetScrollView style={styles.bottomSheetView}>
              <Layout>
                {character && <CharacterCard character={character} />}
              </Layout>
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
  bottomSheetBackground: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderWidth: 1,
    borderColor: colors.background.light,
    backgroundColor: colors.background.main,
  },
  bottomSheetView: {
    flex: 1,
  },
  rowGap: {
    rowGap: 8,
  },
})

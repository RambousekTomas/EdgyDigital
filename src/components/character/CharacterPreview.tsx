import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MainStackParams } from '../../routes/Navigation'
import { colors } from '../../styles'
import { Character } from '../../types/Types'
import { CharacterName } from './components/CharacterName'
import { Identification } from './components/Identification'
import { SpeciesTag } from './components/SpeciesTag'

type CharacterPreviewProps = {
  character: Character
}

export const CharacterPreview = ({ character }: CharacterPreviewProps) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>()
  const onPressDisplayDetail = () =>
    navigation.navigate('characterDetail', { character })

  return (
    <TouchableOpacity onPress={onPressDisplayDetail} style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.content}>
        <CharacterName name={character.name} />
        <View style={styles.textRow}>
          <Identification id={character.id} />
          <SpeciesTag species={character.species} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background.light,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    flex: 1,
    padding: 8,
    rowGap: 8,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

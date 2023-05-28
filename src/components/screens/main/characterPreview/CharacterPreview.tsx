import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import { MainStackParams } from '../../../../routes/Navigation'
import { Character } from '../../../../types/Types'

type CharacterPreviewProps = {
  character: Character
}

export const getSpeciesBGColor = (species: string): StyleProp<TextStyle> => {
  if (species === 'Human') return { backgroundColor: '#73B340' }
  if (species === 'Alien') return { backgroundColor: '#FF5646' }
  return { backgroundColor: '#A4ACAF' }
}

const CharacterPreview = ({ character }: CharacterPreviewProps) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>()
  const onPressDisplayDetail = () =>
    navigation.navigate('characterDetail', { character })

  return (
    <TouchableOpacity onPress={onPressDisplayDetail} style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.textRow}>
        <Text style={styles.id}>#{character.id}</Text>
        <Text style={[styles.species, getSpeciesBGColor(character.species)]}>
          {character.species}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CharacterPreview

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    maxWidth: '49%',
    backgroundColor: '#FED54A',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2421',
    textAlign: 'center',
    paddingVertical: 8,
  },
  id: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    paddingVertical: 2,
  },
  species: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
})

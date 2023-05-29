import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Character } from '../../../../types/Types'
import FavouriteButton from '../../../favouriteButton/FavouriteButton'
import { getSpeciesBGColor } from '../../main/characterPreview/CharacterPreview'

type FavouritePreviewProps = {
  character: Character
  canEdit: boolean
  isActive: boolean
  onLongPress?: () => void
}

const FavouritePreview = ({
  character,
  canEdit,
  onLongPress,
  isActive,
}: FavouritePreviewProps) => {
  return (
    <Pressable
      onLongPress={canEdit ? onLongPress : undefined}
      disabled={isActive}
      style={[
        styles.card,
        { backgroundColor: isActive ? '#e6b207' : '#FED54A' },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.flex} />
        <Text style={styles.id}>#{character.id}</Text>
        <Text style={[styles.species, getSpeciesBGColor(character.species)]}>
          {character.species}
        </Text>
      </View>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.controlsContainer}
      >
        {canEdit && <FavouriteButton character={character} />}
      </Animated.View>
    </Pressable>
  )
}

export default FavouritePreview

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FED54A',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  imageContainer: { flex: 2 },
  descriptionContainer: { flex: 3, marginHorizontal: 8 },
  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  flex: { flex: 1 },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  description: {
    // justifyContent: 'space-between',
    backgroundColor: 'orange',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2421',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  id: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  species: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignSelf: 'flex-start',
  },
})

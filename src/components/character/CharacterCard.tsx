import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { colors } from '../../styles'
import { Character } from '../../types/Types'
import FavouriteButton from '../buttons/FavouriteButton'
import { AliveStatus } from './components/AliveStatus'
import { CharacterName } from './components/CharacterName'
import { EpisodeList } from './components/EpisodeList'
import { GenderIcon } from './components/GenderIcon'
import { Identification } from './components/Identification'
import { LastLocation } from './components/LastLocation'
import { SpeciesTag } from './components/SpeciesTag'

interface CharacterCardProps {
  character: Character
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: character.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <FavouriteButton character={character} />
      </ImageBackground>
      <View style={styles.content}>
        <CharacterName name={character.name} />
        <View style={[styles.row, styles.spaced]}>
          <Identification id={character.id} />
          <View style={[styles.row, styles.gap]}>
            <AliveStatus status={character.status} />
            <GenderIcon gender={character.gender} />
            <SpeciesTag species={character.species} />
          </View>
        </View>
        <LastLocation location={character.location} />
        <EpisodeList episode={character.episode} />
      </View>
    </View>
  )
}

export default CharacterCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.background.light,
    elevation: 3,
  },
  content: {
    padding: 8,
    rowGap: 8,
  },
  imageBackground: {
    width: '100%',
    height: 200,
    alignItems: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
  },
  spaced: {
    justifyContent: 'space-between',
  },
  gap: {
    gap: 4,
  },
})

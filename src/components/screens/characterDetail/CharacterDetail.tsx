import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MainStackParams } from '../../../routes/Navigation'
import FavouriteButton from '../../favouriteButton/FavouriteButton'
import { getSpeciesBGColor } from '../main/characterPreview/CharacterPreview'

const getGenderIconName = (gender: string): string => {
  if (gender === 'Male') return 'gender-male'
  if (gender === 'Female') return 'gender-female'
  return 'head-question'
}

const getStatusColor = (status: string): string => {
  if (status === 'Alive') return 'green'
  if (status === 'Dead') return 'red'
  return 'gray'
}

const CharacterDetailScreen = () => {
  const { character } =
    useRoute<RouteProp<MainStackParams, 'characterDetail'>>().params

  const onPressOpenEpisode = useCallback(
    (url: string) => async () => {
      await Linking.openURL(url)
    },
    [],
  )

  return (
    <View style={styles.background}>
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: character.image }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <FavouriteButton character={character} />
        </ImageBackground>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.textRow}>
          <Text style={styles.generalText}>#{character.id}</Text>
          <View style={styles.textRow}>
            <Text
              style={[styles.species, getSpeciesBGColor(character.species)]}
            >
              {character.species}
            </Text>
          </View>
        </View>
        <View style={styles.textRow}>
          <View style={styles.textRow}>
            <MCIcon
              name={'circle'}
              color={getStatusColor(character.status)}
              size={12}
              style={styles.statusIcon}
            />
            <Text style={styles.title}>{character.status}</Text>
          </View>

          <MCIcon
            name={getGenderIconName(character.gender)}
            color={'black'}
            size={20}
          />
        </View>
        {character.location && (
          <View>
            <Text style={styles.title}>Last known location:</Text>
            <Text style={styles.generalText}>{character.location.name}</Text>
          </View>
        )}

        <View style={styles.flex}>
          <Text style={styles.title}>Episodes:</Text>
          <ScrollView style={styles.flex}>
            {character.episode?.map((e) => (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <TouchableOpacity onPress={onPressOpenEpisode(e)} key={e}>
                <Text style={styles.generalText}>
                  Episode {e.split('/').pop()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default CharacterDetailScreen

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: '#FED54A',
    elevation: 4,
  },
  flex: { flex: 1 },
  imageBackground: {
    width: '100%',
    height: 200,
    alignItems: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 8,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A2421',
    textAlign: 'center',
    paddingVertical: 8,
  },
  id: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  species: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2421',
    paddingVertical: 2,
  },
  generalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    paddingVertical: 2,
  },
  statusIcon: {
    marginRight: 8,
  },
})

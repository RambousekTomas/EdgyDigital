import React from 'react'
import {
  FlatList,
  Linking,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors } from '../../../styles'
import { Text } from '../../text/Text'

interface EpisodeListProps {
  episode: string[] | null | undefined
}

export const EpisodeList = ({ episode }: EpisodeListProps) => {
  return (
    <View style={styles.episodeListContainer}>
      <Text variant="title" style={styles.title}>
        Episodes:
      </Text>
      <FlatList
        data={episode}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const onPressOpenEpisode = (url: string) => {
  void Linking.openURL(url)
}

const renderItem = ({ item }: ListRenderItemInfo<string>) => {
  return (
    <TouchableOpacity
      onPress={() => onPressOpenEpisode(item)}
      style={styles.episode}
    >
      <Text variant="body">Episode {item.split('/').pop()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  contentContainer: {
    gap: 8,
  },
  episodeListContainer: {
    gap: 4,
  },
  episode: {
    backgroundColor: colors.background.dark,
    padding: 4,
    marginVertical: 2,
    borderRadius: 4,
    elevation: 2,
  },
})

import React, { useCallback, useState } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Animated, { FadeOutDown } from 'react-native-reanimated'
import { useFetchCharacters } from '../../../api/Requests'
import { Character } from '../../../types/Types'
import Layout from '../../layout/Layout'
import { StyleSheet, Text, View } from 'react-native'
import Spinner from '../../spinner/Spinner'
import CharacterPreview from './characterPreview/CharacterPreview'

const keyExtractor = (character: Character) => character.id.toString()

const renderItem = ({ item: character }: ListRenderItemInfo<Character>) => (
  <CharacterPreview {...character} />
)

const MainScreen = () => {
  const [continuousLoading, setContinuousLoading] = useState<true | undefined>(
    undefined,
  )
  const { characters, isLoading, fetchMoreCharacters } = useFetchCharacters()

  const onPressEnableContinuousLoading = useCallback(() => {
    setContinuousLoading(true)
    fetchMoreCharacters()
  }, [])


  return (
    <Layout>
    <View>
      <Text>Main</Text>
        <FlatList
          data={characters}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={continuousLoading && fetchMoreCharacters}
          ListFooterComponent={<Spinner animating={isLoading} size={40} />}
        />
      </View>
      {!continuousLoading && (
        <Animated.View exiting={FadeOutDown} style={styles.buttonView}>
          <Pressable
            onPress={onPressEnableContinuousLoading}
            android_ripple={{ color: 'rgba(125, 140, 1, 0.7)' }}
            style={styles.buttonLoadMore}
          >
            <Text style={styles.btnLoadMoreText}>Load more</Text>
          </Pressable>
        </Animated.View>
      )}
    </Layout>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  listColumnWrapper: { columnGap: 8 },
  contentContainerStyle: { rowGap: 8 },
  buttonView: {
    height: 40,
    marginTop: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  buttonLoadMore: {
    height: 40,
    backgroundColor: 'rgb(186 208 3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnLoadMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})

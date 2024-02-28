import { useInfiniteQuery } from '@tanstack/react-query'
import { isNilOrEmpty } from 'ramda-adjunct'
import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { fetchCharacters } from '../../../api/Requests'
import { sharedStyles } from '../../../styles/styles'
import { Character } from '../../../types/Types'
import { CharacterPreview } from '../../character/CharacterPreview'
import Layout from '../../layout/Layout'
import SearchBar from '../../searchBar/SearchBar'
import Spinner from '../../spinner/Spinner'
import { Text } from '../../text/Text'

const keyExtractor = (character: Character) => character.id.toString()

const renderItem = ({ item: character }: ListRenderItemInfo<Character>) => (
  <CharacterPreview character={character} />
)

const MainScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['characters', searchPhrase],
    queryFn: ({ pageParam }) =>
      fetchCharacters(
        pageParam,
        isNilOrEmpty(searchPhrase) ? undefined : { name: searchPhrase },
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const onEndReached = () => {
    if (hasNextPage) {
      void fetchNextPage()
    }
  }

  return (
    <Layout>
      <SearchBar
        setSearchPhrase={setSearchPhrase}
        searchFocus={searchFocus}
        setSearchFocus={setSearchFocus}
      />
      <View
        onStartShouldSetResponder={() => {
          setSearchFocus(false)
          return false
        }}
        style={sharedStyles.flex}
      >
        <FlatList
          data={data?.pages.flatMap((page) => page.data) ?? []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={onEndReached}
          ListFooterComponent={<Spinner animating={isFetching} size={40} />}
          ListEmptyComponent={
            isFetching ? null : (
              <Text variant="title" style={styles.listEmptyText}>
                No characters found
              </Text>
            )
          }
        />
      </View>
    </Layout>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  listColumnWrapper: { columnGap: 8 },
  contentContainerStyle: { rowGap: 8 },
  listEmptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
})

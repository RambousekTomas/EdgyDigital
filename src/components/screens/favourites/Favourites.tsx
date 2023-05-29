import { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'
import {
  selectFavourites,
  set_favourites,
} from '../../../store/slices/FavouriteSlice'
import { Character } from '../../../types/Types'
import Layout from '../../layout/Layout'
import FavouritePreview from './favouritePreview/FavouritePreview'

const keyExtractor = (item: Character) => item.name

const renderItem =
  (canEdit: boolean) =>
  ({ item: character, drag, isActive }: RenderItemParams<Character>) =>
    (
      <FavouritePreview
        character={character}
        canEdit={canEdit}
        isActive={isActive}
        onLongPress={drag}
      />
    )

const FavouritesScreen = () => {
  const favourites = useAppSelector(selectFavourites)
  const dispatch = useAppDispatch()

  const [edit, setEdit] = useState(false)
  const onPressEnableEdit = useCallback(() => {
    setEdit(!edit)
  }, [edit])

  const onDragEnd = useCallback(({ data }: DragEndParams<Character>) => {
    dispatch(set_favourites(data))
  }, [])

  return (
    <Layout>
      <View style={styles.buttonView}>
        <Pressable
          onPress={onPressEnableEdit}
          android_ripple={{ color: 'rgba(125, 140, 1, 0.7)' }}
          style={styles.btnEdit}
        >
          <Text style={styles.btnEditText}>{edit ? 'Stop edit' : 'Edit'}</Text>
        </Pressable>
      </View>
      <View style={styles.flex}>
        <DraggableFlatList
          data={favourites}
          renderItem={renderItem(edit)}
          keyExtractor={keyExtractor}
          onDragEnd={onDragEnd}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            favourites.length ? undefined : (
              <Text style={styles.listEmptyText}>
                No favourite characters found
              </Text>
            )
          }
        />
      </View>
    </Layout>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({
  flex: { flex: 1 },
  buttonView: {
    height: 40,
    marginBottom: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  btnEdit: {
    height: 40,
    backgroundColor: 'rgb(186 208 3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnEditText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  listColumnWrapper: { columnGap: 8 },
  listContentContainer: { rowGap: 8 },
  listEmptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
})

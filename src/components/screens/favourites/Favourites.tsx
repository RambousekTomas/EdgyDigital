import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'
import {
  selectFavourites,
  set_favourites,
} from '../../../store/slices/FavouriteSlice'
import { sharedStyles } from '../../../styles/styles'
import { Character } from '../../../types/Types'
import Button from '../../buttons/Button'
import Layout from '../../layout/Layout'
import { Text } from '../../text/Text'
import FavouritePreview from './favouritePreview/FavouritePreview'

export const FavouritesScreen = () => {
  const favourites = useAppSelector(selectFavourites)
  const dispatch = useAppDispatch()

  const [edit, setEdit] = useState(false)
  const onPressEnableEdit = () => setEdit(!edit)

  const onDragEnd = ({ data }: DragEndParams<Character>) =>
    dispatch(set_favourites(data))

  return (
    <Layout>
      <View style={styles.btnContainer}>
        <Button
          title={edit ? 'Stop edit' : 'Edit'}
          onPress={onPressEnableEdit}
        />
      </View>
      <View style={sharedStyles.flex}>
        <DraggableFlatList
          data={favourites}
          renderItem={renderItem(edit)}
          keyExtractor={keyExtractor}
          onDragEnd={onDragEnd}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            favourites.length ? undefined : (
              <Text variant="title" style={styles.listEmptyText}>
                No favourite characters found
              </Text>
            )
          }
        />
      </View>
    </Layout>
  )
}

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

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: 16,
  },
  listContentContainer: { rowGap: 8, paddingBottom: 4 },
  listEmptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
})

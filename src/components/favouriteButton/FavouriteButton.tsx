import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAppDispatch, useAppSelector } from '../../store/hooks/Hooks'
import {
  add_favourite,
  remove_favourite,
  selectIsFavourite,
} from '../../store/slices/FavouriteSlice'
import { Character } from '../../types/Types'

type FavouriteButtonProps = {
  character: Character
}

const FavouriteButton = ({ character }: FavouriteButtonProps) => {
  const dispatch = useAppDispatch()
  const isFavourite = useAppSelector(selectIsFavourite(character.id))

  const onPressMakeFavourite = useCallback(() => {
    dispatch(add_favourite(character))
  }, [])

  const onPressRemoveFavourite = useCallback(() => {
    dispatch(remove_favourite(character))
  }, [])

  return (
    <TouchableOpacity
      onPress={isFavourite ? onPressRemoveFavourite : onPressMakeFavourite}
      style={styles.icon}
    >
      <MCIcon
        name={isFavourite ? 'star' : 'star-outline'}
        size={40}
        color="#bad003"
      />
    </TouchableOpacity>
  )
}

export default FavouriteButton

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

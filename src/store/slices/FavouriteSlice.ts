import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { Character } from '../../types/Types'
import { RootState } from '../Store'

interface FavouriteState {
  favourites: Character[]
}

const initialState: FavouriteState = {
  favourites: [],
}

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    add_favourite: (state, action: PayloadAction<Character>) => {
      state.favourites = [...state.favourites, action.payload]
    },
    remove_favourite: (state, action: PayloadAction<Character>) => {
      state.favourites = state.favourites.filter(
        (f) => f.id !== action.payload.id,
      )
    },
    set_favourites: (state, action: PayloadAction<Character[]>) => {
      state.favourites = action.payload
    },
  },
})

export const { add_favourite, remove_favourite, set_favourites } =
  favouriteSlice.actions

export const selectFavourites = (state: RootState) => state.favourite.favourites
export const selectIsFavourite = (id: number) =>
  createSelector(selectFavourites, (selectFavourite) =>
    selectFavourite.some((favourite) => favourite.id === id),
  )

export default favouriteSlice.reducer

import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { storeUserFavourites } from '../../storage/Storage'
import { RootState } from '../Store'
import { selectFavourites, set_favourites } from '../slices/FavouriteSlice'
import {
  revoke_authorization,
  selectUsername,
  set_username,
} from '../slices/UserSlice'

export const logoutThunk =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const username = selectUsername(getState())
    const favourites = selectFavourites(getState())
    if (favourites.length && username)
      await storeUserFavourites(username, favourites)
    dispatch(set_favourites([]))
    dispatch(revoke_authorization())
    dispatch(set_username(undefined))
  }

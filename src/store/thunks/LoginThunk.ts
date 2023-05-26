import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { retrieveUserFavourites } from '../../storage/Storage'
import { UserLogin } from '../../types/Types'
import { RootState } from '../Store'
import { set_favourites } from '../slices/FavouriteSlice'
import { authorize, set_username } from '../slices/UserSlice'

export const loginThunk =
  (user: UserLogin): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(authorize())
    dispatch(set_username(user.username))
    const userFavourites = await retrieveUserFavourites(user.username)
    if (userFavourites) dispatch(set_favourites(userFavourites))
  }

import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../Store'

interface UserState {
  isAuthorized: boolean
  name?: string
}

const initialState: UserState = {
  isAuthorized: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorize: (state) => {
      state.isAuthorized = true
    },
    revoke_authorization: (state) => {
      state.isAuthorized = false
    },
    set_username: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload
    },
  },
})

export const { authorize, revoke_authorization, set_username } =
  userSlice.actions

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized
export const selectUsername = (state: RootState) => state.user.name

export const selectUser = createSelector(
  [selectUsername, selectIsAuthorized],
  (name, isAuthorized) => {
    return { isAuthorized, name }
  },
)

export default userSlice.reducer

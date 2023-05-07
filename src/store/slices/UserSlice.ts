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
    revokeAuthorization: (state) => {
      state.isAuthorized = false
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const { authorize, revokeAuthorization } = userSlice.actions

export const selectIsAuthorized = (state: RootState) => state.user.isAuthorized
export const selectName = (state: RootState) => state.user.name

export const selectUser = createSelector(
  [selectName, selectIsAuthorized],
  (name, authorization) => {
    return { isAuthorized: authorization, name }
  },
)

export default userSlice.reducer

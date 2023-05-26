import { combineReducers, configureStore } from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import favouriteReducer from './slices/FavouriteSlice'
import userReducer from './slices/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,
  favourite: favouriteReducer,
})

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

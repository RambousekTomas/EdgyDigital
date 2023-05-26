import EncryptedStorage from 'react-native-encrypted-storage'
import { Character } from '../types/Types'

export const storeUserFavourites = async (
  username: string,
  favourites: Character[],
) => {
  try {
    await EncryptedStorage.setItem(
      `${username}-favourites`,
      JSON.stringify(favourites),
    )
  } catch (error) {
    console.log('Unable to store user favourites!')
  }
}

export const retrieveUserFavourites = async (
  username: string,
): Promise<Character[] | null> => {
  try {
    const jsonValue = await EncryptedStorage.getItem(`${username}-favourites`)

    return jsonValue != null ? (JSON.parse(jsonValue) as Character[]) : null
  } catch (error) {
    return null
  }
}

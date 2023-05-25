import _ from 'lodash'
import React, { memo, useCallback, useRef } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

type SearchBarProps = {
  searchFocus: boolean
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({
  searchFocus,
  setSearchFocus,
  setSearchPhrase,
}: SearchBarProps) => {
  const searchInput = useRef<TextInput | null>(null)

  const resetSearch = useCallback(() => {
    setSearchPhrase('')
    searchInput.current?.clear()
    Keyboard.dismiss()
  }, [])

  const onSearchFocus = useCallback(() => {
    setSearchFocus(true)
  }, [])

  const debouncedOnChange = useCallback(
    _.debounce((text: string) => {
      setSearchPhrase(text)
    }, 500),
    [],
  )

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MCIcon name="magnify" size={24} color="black" />
      </View>
      <TextInput
        ref={searchInput}
        style={styles.input}
        placeholder="Search"
        onChangeText={debouncedOnChange}
        onFocus={onSearchFocus}
        inputMode="search"
        returnKeyType="search"
      />
      {searchFocus && (
        <TouchableOpacity onPress={resetSearch} style={styles.icon}>
          <MCIcon name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default memo(SearchBar)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginBottom: 16,
    elevation: 4,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    height: 36,
    marginVertical: 2,
    padding: 0,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

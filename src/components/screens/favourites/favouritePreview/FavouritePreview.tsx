import { Image, Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { colors } from '../../../../styles/colors'
import { Character } from '../../../../types/Types'
import FavouriteButton from '../../../buttons/FavouriteButton'
import { CharacterName } from '../../../character/components/CharacterName'
import { Identification } from '../../../character/components/Identification'
import { SpeciesTag } from '../../../character/components/SpeciesTag'

type FavouritePreviewProps = {
  character: Character
  canEdit: boolean
  isActive: boolean
  onLongPress?: () => void
}

const FavouritePreview = ({
  character,
  canEdit,
  onLongPress,
  isActive,
}: FavouritePreviewProps) => {
  return (
    <Pressable
      onLongPress={canEdit ? onLongPress : undefined}
      disabled={isActive}
      style={[
        styles.card,
        {
          backgroundColor: isActive
            ? colors.background.dark
            : colors.background.light,
        },
      ]}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <CharacterName name={character.name} style={styles.characterName} />
        <Identification id={character.id} />
        <View style={styles.speciesTagContainer}>
          <SpeciesTag species={character.species} />
        </View>
      </View>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        {canEdit && <FavouriteButton character={character} />}
      </Animated.View>
    </Pressable>
  )
}

export default FavouritePreview

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  characterName: {
    textAlign: 'left',
  },
  speciesTagContainer: {
    flexDirection: 'row',
  },
})

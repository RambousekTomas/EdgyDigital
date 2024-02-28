import { RouteProp, useRoute } from '@react-navigation/native'
import { MainStackParams } from '../../../routes/Navigation'
import Layout from '../../layout/Layout'
import CharacterCard from '../../character/CharacterCard'

export const CharacterDetailScreen = () => {
  const { character } =
    useRoute<RouteProp<MainStackParams, 'characterDetail'>>().params

  return (
    <Layout>
      <CharacterCard character={character} />
    </Layout>
  )
}

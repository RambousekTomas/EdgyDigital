import { StyleSheet, View } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from '../../text/Text'

interface AliveStatusProps {
  status: string
}

export const AliveStatus = ({ status }: AliveStatusProps) => {
  return (
    <View style={styles.textRow}>
      <MCIcon
        name={'circle'}
        color={getStatusColor(status)}
        size={12}
        style={styles.statusIcon}
      />
      <Text variant="body">{status}</Text>
    </View>
  )
}

const getStatusColor = (status: string): string => {
  if (status === 'Alive') return 'green'
  if (status === 'Dead') return 'red'
  return 'gray'
}

const styles = StyleSheet.create({
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIcon: {
    marginRight: 4,
  },
})

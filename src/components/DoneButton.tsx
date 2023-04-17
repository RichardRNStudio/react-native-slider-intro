import { StyleSheet, Text } from 'react-native'
import { IDoneButton } from 'interfaces/IDoneButton.interface'

const styles = StyleSheet.create({
  doneText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14
  }
})

const DoneButton = ({ doneLabel }: IDoneButton) => <Text style={styles.doneText}>{doneLabel}</Text>

export default DoneButton

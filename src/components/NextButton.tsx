import { StyleSheet, Text } from 'react-native'
import { INextButton } from '../interfaces/INextButton.interface'

const styles = StyleSheet.create({
  nextText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14
  }
})

const NextButton = ({ nextLabel }: INextButton) => <Text style={styles.nextText}>{nextLabel}</Text>

export default NextButton

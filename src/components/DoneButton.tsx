import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { IDoneButton } from '../interfaces/IDoneButton.interface';

const DoneButton = ({ doneLabel }: IDoneButton) => {
  return <Text style={styles.doneText}>{doneLabel}</Text>;
};

export default DoneButton;

const styles = StyleSheet.create({
  doneText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

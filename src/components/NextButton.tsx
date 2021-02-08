import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { INextButton } from '../interfaces/INextButton.interface';

const NextButton = ({ nextLabel }: INextButton) => (
  <Text style={styles.nextText}>{nextLabel}</Text>
);

export default NextButton;

const styles = StyleSheet.create({
  nextText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

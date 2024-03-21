import { StyleSheet, Text } from 'react-native';
import type { INextButton } from '../interfaces/INextButton.interface';
import React from 'react';

const styles = StyleSheet.create({
  nextText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

const NextButton = ({ nextLabel }: INextButton) => (
  <Text style={styles.nextText}>{nextLabel}</Text>
);

export default NextButton;

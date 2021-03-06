import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ISkipButton } from '../interfaces/ISkipButton.interface';

const SkipButton = ({ skipLabel }: ISkipButton) => (
  <View style={styles.skipButton}>
    <Text style={styles.skipText}>{skipLabel}</Text>
  </View>
);

export default SkipButton;

const styles = StyleSheet.create({
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

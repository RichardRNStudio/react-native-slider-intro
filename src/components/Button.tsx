import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { IButton } from '../interfaces/IButton.interface';

const styles = StyleSheet.create({
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

const Button = ({ label, type }: IButton) => {
  if (type === 'skip') {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
  return <Text style={styles.label}>{label}</Text>;
};

export default Button;

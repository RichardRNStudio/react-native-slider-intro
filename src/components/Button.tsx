import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonType, type ButtonProps } from '../types/Button.types';

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

const Button = ({ label, type }: ButtonProps) => {
  if (type === ButtonType.Skip) {
    return (
      <View style={styles.skipButton}>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
  return <Text style={styles.label}>{label}</Text>;
};

export default Button;

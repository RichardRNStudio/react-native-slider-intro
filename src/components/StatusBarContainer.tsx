import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import type { StatusBarProps } from '../types/StatusBar.types';
import React from 'react';

const styles = StyleSheet.create({
  viewStyle: {
    height: 24,
  },
});

const StatusBarContainer = ({ backgroundColor }: StatusBarProps) => (
  <>
    <StatusBar
      barStyle="light-content"
      translucent={true}
      hidden={false}
      backgroundColor={backgroundColor}
    />
    {Platform.OS === 'android' && Platform.Version >= 20 ? (
      <View style={[styles.viewStyle, { backgroundColor }]} />
    ) : null}
  </>
);

export default StatusBarContainer;

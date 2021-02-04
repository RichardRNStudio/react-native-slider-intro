import React from 'react';
import { StatusBar, View, Platform, StyleSheet } from 'react-native';
import { IStatusBarContainer } from 'src/interfaces/IStatusBar';

const StatusBarContainer = ({ backgroundColor }: IStatusBarContainer) => {
  return (
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
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 24,
  },
});

export default StatusBarContainer;

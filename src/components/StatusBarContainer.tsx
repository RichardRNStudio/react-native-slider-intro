import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { IStatusBarContainer } from 'src/interfaces/IStatusBar';

const StatusBarContainer = ({ backgroundColor }: IStatusBarContainer) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        hidden={false}
        backgroundColor={backgroundColor}
      />
      {Platform.OS === 'android' && Platform.Version >= 20 ? (
        <View
          style={{
            height: 24,
            backgroundColor,
          }}
        />
      ) : null}
    </>
  );
};

export default StatusBarContainer;

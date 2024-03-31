import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import DotContainer from './DotContainer';
import NextContainer from './NextContainer';
import PrevContainer from './PrevContainer';
import { SliderContext } from './SliderProvider';

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    width: '100%',
    maxWidth: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navigation: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  prevContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

const Navigation = () => {
  const { navigationBarBottom, navigationBarHeight, columnButtonStyle } =
    useContext(SliderContext);

  return (
    <View
      style={[
        styles.navContainer,
        {
          bottom: navigationBarBottom,
          height: navigationBarHeight,
          maxHeight: navigationBarHeight,
        },
      ]}
    >
      <View
        style={[
          styles.navigation,
          columnButtonStyle
            ? styles.flexDirectionColumn
            : styles.flexDirectionRow,
        ]}
      >
        {columnButtonStyle ? (
          <>
            <DotContainer />
            <NextContainer />
            <PrevContainer />
          </>
        ) : (
          <>
            <PrevContainer />
            <DotContainer />
            <NextContainer />
          </>
        )}
      </View>
    </View>
  );
};

export default Navigation;

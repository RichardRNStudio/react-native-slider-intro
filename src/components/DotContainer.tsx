import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { IDotContainer } from 'src/interfaces/IDotContainer.interface';

const DotContainer = ({
  navContainerMaxSize,
  arrayOfSlideIndex,
  fixDotBackgroundColor,
  fixDotOpacity,
  dotWidth,
  _moveSlideDotX,
  _moveSlideDotMarginX,
  animatedDotBackgroundColor,
}: IDotContainer) => (
  <View style={[styles.dotMainContainer, { maxWidth: navContainerMaxSize }]}>
    <View style={[styles.mainDotContainer, { maxWidth: navContainerMaxSize }]}>
      <View style={styles.mainDotInnerContainer}>
        {arrayOfSlideIndex.map((item) => {
          return (
            <View
              key={item}
              style={[
                styles.fixDot,
                {
                  backgroundColor: fixDotBackgroundColor,
                  opacity: fixDotOpacity,
                  width: dotWidth,
                  maxWidth: dotWidth,
                  height: dotWidth,
                  maxHeight: dotWidth,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
    <View style={[styles.animatedDotContainer]}>
      <View style={styles.animatedDotInnerContainer}>
        <Animated.View
          style={[
            styles.animatedDot,
            {
              width: _moveSlideDotX,
              maxWidth: _moveSlideDotX,
              height: dotWidth,
              maxHeight: dotWidth,
              marginLeft: _moveSlideDotMarginX,
              backgroundColor: animatedDotBackgroundColor,
            },
          ]}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  dotMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDotContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  animatedDotContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
  },
  mainDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixDot: {
    flex: 1,
    borderRadius: 100,
  },
  animatedDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  animatedDot: {
    flex: 1,
    borderRadius: 100,
  },
});

export default DotContainer;

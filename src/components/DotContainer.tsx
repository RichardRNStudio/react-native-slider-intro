import React, { useContext } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SliderContext } from './SliderProvider';

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
  mainDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixDot: {
    flex: 1,
    borderRadius: 10,
  },
  animatedDotContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
  },
  animatedDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  animatedDot: {
    borderRadius: 10,
    flex: 1,
    maxWidth: 2,
  },
});

const DotContainer = () => {
  const {
    navContainerMaxSize,
    numberOfSlides,
    fixDotBackgroundColor,
    fixDotOpacity,
    dotWidth,
    animations,
    animatedDotBackgroundColor,
  } = useContext(SliderContext);
  const arrayOfSlideIndex = [...Array(numberOfSlides).keys()];

  const { _slideDotScaleX, _slideDotTranslateX } = animations;

  return (
    <View style={[styles.dotMainContainer, { maxWidth: navContainerMaxSize }]}>
      <View
        style={[styles.mainDotContainer, { maxWidth: navContainerMaxSize }]}
      >
        <View style={styles.mainDotInnerContainer}>
          {arrayOfSlideIndex.map((_, index) => {
            return (
              <View
                key={index}
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
      <View style={styles.animatedDotContainer}>
        <View style={styles.animatedDotInnerContainer}>
          <Animated.View
            style={[
              styles.animatedDot,
              {
                transform: [
                  { translateX: _slideDotTranslateX },
                  {
                    scaleX: _slideDotScaleX,
                  },
                ],
                borderRadius: Animated.divide(dotWidth, _slideDotScaleX),
                width: dotWidth,
                minWidth: dotWidth,
                height: dotWidth,
                minHeight: dotWidth,
                maxHeight: dotWidth,
                backgroundColor: animatedDotBackgroundColor,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default DotContainer;

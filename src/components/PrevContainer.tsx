import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { IPrevContainer } from 'src/interfaces/IPrevContainer.interface';
import { ISlide } from 'src/interfaces/ISlide.interface';

const handlePress = (
  onSkip: () => void,
  setDefaultState: () => void,
  type: 'previous' | 'skip',
  goToNewSlide: (
    nextActive: number,
    slide: ISlide,
    setSlide: (arg0: ISlide) => void,
    numberOfSlide: number,
    onDone: () => void,
    navContainerMaxSize: number,
    dotWidth: number,
    deviceMaxWidth: number
  ) => void,
  slide: ISlide,
  setSlide: (arg0: ISlide) => void,
  numberOfSlide: number,
  onDone: () => void,
  navContainerMaxSize: number,
  dotWidth: number,
  deviceMaxWidth: number
) => {
  const { active } = slide;
  if (type === 'skip') {
    setDefaultState();
    onSkip();
    return;
  }
  goToNewSlide(
    active - 1,
    slide,
    setSlide,
    numberOfSlide,
    onDone,
    navContainerMaxSize,
    dotWidth,
    deviceMaxWidth
  );
};

const PrevContainer = ({
  setDefaultState,
  onSkip,
  buttonsMaxSize,
  _opacityOfSkipButton,
  renderSkipButton,
  type,
  goToNewSlide,
  slide,
  setSlide,
  numberOfSlide,
  onDone,
  navContainerMaxSize,
  dotWidth,
  deviceMaxWidth,
  showLeftButton,
}: IPrevContainer) => {
  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      {showLeftButton && (
        <TouchableOpacity
          onPress={() =>
            handlePress(
              onSkip,
              setDefaultState,
              type,
              goToNewSlide,
              slide,
              setSlide,
              numberOfSlide,
              onDone,
              navContainerMaxSize,
              dotWidth,
              deviceMaxWidth
            )
          }
        >
          <Animated.View
            style={{
              maxWidth: buttonsMaxSize,
              opacity: _opacityOfSkipButton,
            }}
          >
            {renderSkipButton()}
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrevContainer;

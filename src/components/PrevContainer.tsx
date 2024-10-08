import React, { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SliderContext } from './SliderProvider';
import type { PrevContainerProps } from '../types/PrevContainer.types';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PrevContainer = ({
  setDefaultState,
  goToNewSlide,
}: PrevContainerProps) => {
  const {
    sliderState,
    onSkip,
    leftButtonType,
    buttonsMaxSize,
    showLeftButton,
    renderSkipButton,
    skipLabel,
  } = useContext(SliderContext);
  const [slide] = sliderState;
  const { _opacityOfSkipButton } = slide.animations;

  const handlePress = () => {
    const { active } = slide;
    if (leftButtonType === 'skip') {
      setDefaultState();
      onSkip();
      return;
    }
    goToNewSlide(active - 1);
  };

  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      {showLeftButton && (
        <TouchableOpacity onPress={handlePress}>
          <Animated.View
            style={{
              maxWidth: buttonsMaxSize,
              opacity: _opacityOfSkipButton,
            }}
          >
            {renderSkipButton(skipLabel)}
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PrevContainer;

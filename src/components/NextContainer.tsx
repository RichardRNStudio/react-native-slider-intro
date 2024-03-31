import React, { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SliderContext } from './SliderProvider';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NextContainer = () => {
  const {
    sliderState,
    animations,
    renderNextButton,
    renderDoneButton,
    buttonsMaxSize,
    goToNewSlide,
    nextLabel,
    doneLabel,
    isLastSlide,
  } = useContext(SliderContext);
  const [slide] = sliderState;
  const { _opacityOfNextButton, _opacityOfDoneButton } = animations;
  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      <TouchableOpacity onPress={() => goToNewSlide(slide.active + 1)}>
        {!isLastSlide ? (
          <Animated.View style={{ opacity: _opacityOfNextButton }}>
            {renderNextButton(nextLabel)}
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: _opacityOfDoneButton }}>
            {renderDoneButton(doneLabel)}
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NextContainer;

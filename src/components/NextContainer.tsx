import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { INextContainer } from 'interfaces/INextContainer.interface';
import React from 'react';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NextContainer = ({
  goToNewSlide,
  slide,
  setSlide,
  numberOfSlide,
  onDone,
  navContainerMaxSize,
  dotWidth,
  deviceMaxWidth,
  renderNextButton,
  renderDoneButton,
  isLastSlide,
  buttonsMaxSize,
}: INextContainer) => {
  const { active, animations } = slide;
  const { _opacityOfNextButton, _opacityOfDoneButton } = animations;
  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      <TouchableOpacity
        onPress={() =>
          goToNewSlide(
            active + 1,
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
        {!isLastSlide ? (
          <Animated.View style={{ opacity: _opacityOfNextButton }}>
            {renderNextButton()}
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: _opacityOfDoneButton }}>
            {renderDoneButton()}
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NextContainer;

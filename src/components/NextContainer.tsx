import React from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { INextContainer } from 'src/interfaces/INextContainer.interface';

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

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NextContainer;

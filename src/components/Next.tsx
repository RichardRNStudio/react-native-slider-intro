import React, { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SliderContext } from './SliderProvider';
import { ButtonType } from '../types/Button.types';
import Button from './Button';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Next = () => {
  const {
    renderNextButton,
    renderDoneButton,
    buttonsMaxSize,
    nextLabel,
    doneLabel,
    slide,
    goToNewSlide,
    isLastSlide,
    animations,
  } = useContext(SliderContext);
  const { _opacityOfNextButton, _opacityOfDoneButton } = animations;

  const renderDefaultNextButton = (label: string) => (
    <Button label={label} type={ButtonType.Next} />
  );
  const renderDefaultDoneButton = (label: string) => (
    <Button label={label} type={ButtonType.Done} />
  );

  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      <TouchableOpacity onPress={() => goToNewSlide(slide.active + 1)}>
        {!isLastSlide ? (
          <Animated.View style={{ opacity: _opacityOfNextButton }}>
            {renderNextButton
              ? renderNextButton(nextLabel)
              : renderDefaultNextButton(nextLabel)}
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: _opacityOfDoneButton }}>
            {renderDoneButton
              ? renderDoneButton(doneLabel)
              : renderDefaultDoneButton(doneLabel)}
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Next;

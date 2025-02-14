import React, { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SliderContext } from './SliderProvider';
import { ButtonType } from '../types/Button.types';
import Button from './Button';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Previous = () => {
  const {
    onSkip,
    leftButtonType,
    buttonsMaxSize,
    showLeftButton,
    renderSkipButton,
    skipLabel,
    slide,
    setDefaultState,
    goToNewSlide,
    animations,
  } = useContext(SliderContext);
  const { _opacityOfSkipButton } = animations;

  const handlePress = () => {
    const { active } = slide;
    if (leftButtonType === ButtonType.Skip) {
      setDefaultState();
      onSkip?.();
      return;
    }
    goToNewSlide(active - 1);
  };

  const renderDefaultSkipButton = (label: string | undefined) => (
    <Button label={label} type={ButtonType.Skip} />
  );

  return (
    <View style={[styles.wrapper, { maxWidth: buttonsMaxSize }]}>
      {showLeftButton && (
        <TouchableOpacity onPress={handlePress}>
          <Animated.View
            style={{
              maxWidth: buttonsMaxSize,
              opacity: _opacityOfSkipButton,
            }}
          >
            {renderSkipButton
              ? renderSkipButton(skipLabel)
              : renderDefaultSkipButton(skipLabel)}
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Previous;

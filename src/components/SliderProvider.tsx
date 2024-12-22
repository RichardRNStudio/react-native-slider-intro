import React, { createContext, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  type PanResponderInstance,
} from 'react-native';
import defaultProps from '../defaultProps';
import type { Slide } from '../types/Slide.types';
import type {
  SliderContextProps,
  SliderProviderProps,
} from '../types/SliderProvider.types';

const defaultSlideState: Slide = {
  active: 0,
  previous: 0,
  marginLeft: 0,
  dotMarginLeft: 0,
  expectOpacityOfNext: 1,
  expectOpacityOfDone: 0,
  expectOpacityOfSkip: 1,
  animations: {
    _moveSlideX: new Animated.Value(0),
    _moveSlideDotX: new Animated.Value(0),
    _moveSlideDotMarginX: new Animated.Value(0),
    _opacityOfNextButton: new Animated.Value(0),
    _opacityOfDoneButton: new Animated.Value(0),
    _opacityOfSkipButton: new Animated.Value(0),
  },
};

export const SliderContext = createContext<SliderContextProps>({
  ...defaultProps,
  numberOfSlides: defaultProps.data?.length ?? 1,
  navContainerMaxSize: 0,
  dotMaxPossibleWidth: 0,
  buttonsMaxSize: 0,
  slidesMaxWidth: 0,
  limitToSlide: 0,
  panResponderState: [
    PanResponder.create(Object.create(null)),
    () => PanResponder.create(Object.create(null)),
  ],
  sliderState: [defaultSlideState, () => defaultSlideState],
});

const deviceMaxWidth = Dimensions.get('window').width;

const SliderProvider = (props: SliderProviderProps) => {
  const {
    onDone,
    dotWidth,
    navContainerMaxSizePercent,
    backHandlerBehaviour,
    animateDotBouncing,
    animateSlideSpeed,
    animateDotSpeed,
    hasReactNavigation,
    useCustomBackHandlerEffect,
    isCustomRender,
    data,
    limitToSlide,
  } = props;
  const numberOfSlides = isCustomRender
    ? props?.numberOfSlides
    : (data?.length ?? 1);

  const panResponderState = useState<PanResponderInstance>(
    PanResponder.create(Object.create(null))
  );
  const sliderState = useState<Slide>(defaultSlideState);

  const slidesMaxWidth = (numberOfSlides - 1) * deviceMaxWidth;
  const navContainerMaxSize = deviceMaxWidth * navContainerMaxSizePercent;
  const buttonsMaxSize = (deviceMaxWidth - navContainerMaxSize) / 2 - 1;
  const dotMaxPossibleWidth = navContainerMaxSize / (numberOfSlides - 1) + 9;

  const contextValue = {
    ...props,
    numberOfSlides,
    navContainerMaxSize,
    dotMaxPossibleWidth,
    buttonsMaxSize,
    slidesMaxWidth,
    onDone,
    dotWidth,
    backHandlerBehaviour,
    animateDotBouncing,
    animateSlideSpeed,
    animateDotSpeed,
    hasReactNavigation,
    useCustomBackHandlerEffect,
    limitToSlide,
    panResponderState,
    sliderState,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      {props.children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;

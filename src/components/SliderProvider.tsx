/* eslint-disable no-void */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import type { ISlide } from 'interfaces/ISlide.interface';
import type {
  ISliderContextProps,
  ISliderProviderProps,
} from 'interfaces/ISliderProvider.interface';
import { createContext, useEffect, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  PanResponder,
  type PanResponderInstance,
} from 'react-native';
import type { ISliderIntro } from 'interfaces/ISliderIntro.interface';
import type { IItem } from 'interfaces/IItem.interface';
import Item from './Item';
import StatusBarContainer from './StatusBarContainer';
import Button from './Button';

export const defaultProps: ISliderIntro = {
  data: [],
  renderItem: (item: IItem) => {
    const {
      index,
      title,
      text,
      image,
      backgroundColor,
      activeLanguage,
      link,
      slideMaxHeightPercent,
    } = item;
    return (
      <Item
        key={index}
        index={index}
        title={title}
        text={text}
        image={image}
        backgroundColor={backgroundColor}
        activeLanguage={activeLanguage}
        link={link}
        slideMaxHeightPercent={slideMaxHeightPercent}
      />
    );
  },
  navigationBarBottom: 0,
  navigationBarHeight: 70,
  animateSlideSpeed: 15,
  navContainerMaxSizePercent: 0.5,
  dotWidth: 12,
  fixDotOpacity: 0.35,
  fixDotBackgroundColor: 'grey',
  animatedDotBackgroundColor: 'white',
  animateDotSpeed: 8,
  animateDotBouncing: 2,
  backHandlerBehaviour: 'activeMinusOne',
  hasReactNavigation: false,
  useCustomBackHandlerEffect: () => {},
  skipLabel: 'Skip',
  nextLabel: 'Next',
  doneLabel: 'Done',
  renderSkipButton: (skipLabel: string | undefined) => (
    <Button label={skipLabel} type="skip" />
  ),
  renderNextButton: (nextLabel: string | undefined) => (
    <Button label={nextLabel} type="next" />
  ),
  renderDoneButton: (doneLabel: string | undefined) => (
    <Button label={doneLabel} type="done" />
  ),
  onDone: () => {},
  onSkip: () => {},
  showLeftButton: true,
  leftButtonType: 'skip',
  columnButtonStyle: false,
  showStatusBar: false,
  statusBarColor: '#febe29',
  renderStatusBar: (backgroundColor: string) => (
    <StatusBarContainer backgroundColor={backgroundColor} />
  ),
};

const defaultSlideState: ISlide = {
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

export const SliderContext = createContext<ISliderContextProps>({
  ...defaultProps,
  panResponderState: [
    PanResponder.create(Object.create(null)),
    () => PanResponder.create(Object.create(null)),
  ],
  sliderState: [defaultSlideState, () => defaultSlideState],
  animations: defaultSlideState.animations,
  numberOfSlides: defaultProps.data.length,
  navContainerMaxSize: 0,
  dotMaxPossibleWidth: 0,
  buttonsMaxSize: 0,
  goToNewSlide: () => void 0,
  isLastSlide: false,
  setDefaultState: () => void 0,
});

const deviceMaxWidth = Dimensions.get('window').width;

const SliderProvider = (props: ISliderProviderProps) => {
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
    data,
  } = props;
  const { length: numberOfSlides = 1 } = data;
  const panResponderState = useState<PanResponderInstance>(
    PanResponder.create(Object.create(null))
  );
  const [, setPanResponder] = panResponderState;
  const sliderState = useState<ISlide>(defaultSlideState);
  const [slide, setSlide] = sliderState;

  const {
    active,
    previous,
    marginLeft,
    animations,
    dotMarginLeft,
    expectOpacityOfNext,
    expectOpacityOfDone,
    expectOpacityOfSkip,
  } = slide;
  const {
    _moveSlideX,
    _moveSlideDotX,
    _moveSlideDotMarginX,
    _opacityOfNextButton,
    _opacityOfDoneButton,
    _opacityOfSkipButton,
  } = animations;

  const setDefaultState = () => {
    setSlide({
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
    });
  };

  const goToNewSlide = (newSlide: number) => {
    if (newSlide < 0) {
      return;
    }
    if (newSlide > numberOfSlides - 1) {
      setDefaultState();
      onDone();
      return;
    }

    let opacityOfNext = 0;
    let opacityOfDone = 0;
    let opacityOfSkip = 0;
    let expectedMarginLeft = 0;
    let expectedMarginLeftDot =
      (newSlide * (navContainerMaxSize - numberOfSlides * dotWidth)) /
        (numberOfSlides - 1) +
      newSlide * dotWidth;

    if (newSlide === numberOfSlides - 1) {
      opacityOfNext = 0;
      opacityOfDone = 1;
      opacityOfSkip = 0;
    } else {
      opacityOfNext = 1;
      opacityOfDone = 0;
      opacityOfSkip = 1;
    }

    if (newSlide > active) {
      expectedMarginLeft = -(newSlide * deviceMaxWidth);
    } else if (newSlide < active) {
      expectedMarginLeft = -(newSlide * deviceMaxWidth);
    } else {
      expectedMarginLeft = marginLeft;
    }
    setSlide({
      active: newSlide,
      previous: active,
      dotMarginLeft: expectedMarginLeftDot,
      marginLeft: expectedMarginLeft,
      expectOpacityOfNext: opacityOfNext,
      expectOpacityOfDone: opacityOfDone,
      expectOpacityOfSkip: opacityOfSkip,
      animations: {
        _moveSlideX: _moveSlideX,
        _moveSlideDotX: _moveSlideDotX,
        _moveSlideDotMarginX: _moveSlideDotMarginX,
        _opacityOfNextButton: _opacityOfNextButton,
        _opacityOfDoneButton: _opacityOfDoneButton,
        _opacityOfSkipButton: _opacityOfSkipButton,
      },
    });
  };

  const _onGestureEvent = (translationX: number) => {
    const newValue = translationX + marginLeft;
    const newDotWidthRawValue =
      dotMaxPossibleWidth / (deviceMaxWidth / translationX);
    const newDotWidthValue =
      translationX < 0 ? -1 * newDotWidthRawValue : newDotWidthRawValue;

    if (newValue > 0) {
      _moveSlideDotMarginX.setValue(dotMarginLeft);
      _moveSlideX.setValue(0);
      _moveSlideDotX.setValue(dotWidth);
      return;
    }
    if (newValue < -slidesMaxWidth) {
      _moveSlideDotMarginX.setValue(dotMarginLeft);
      _moveSlideX.setValue(marginLeft);
      _moveSlideDotX.setValue(dotWidth);
      return;
    }
    _moveSlideX.setValue(newValue);

    if (newDotWidthValue <= dotWidth) {
      _moveSlideDotMarginX.setValue(dotMarginLeft);
      _moveSlideDotX.setValue(dotWidth);
      return;
    }
    if (translationX < 0) {
      _moveSlideDotMarginX.setValue(dotMarginLeft);
      return;
    }
    _moveSlideDotMarginX.setValue(dotMarginLeft - newDotWidthValue + dotWidth);
    _moveSlideDotX.setValue(newDotWidthValue);
  };

  const _onHandlerStateChange = (translationX: number) => {
    const newValue = translationX + marginLeft;
    if (!(newValue <= 0 && newValue >= -slidesMaxWidth)) return;
    let absoluteTranslation = 0;
    if (translationX < 0) {
      absoluteTranslation = translationX * -1;
      if (absoluteTranslation > limitToSlide) {
        goToNewSlide(active + 1);
        return;
      }
      goToNewSlide(active);
      return;
    }
    absoluteTranslation = translationX;
    if (absoluteTranslation > limitToSlide) {
      goToNewSlide(active - 1);
      return;
    }
    goToNewSlide(active);
  };

  const onBackPress = () => {
    backHandlerBehaviour === 'activeMinusOne'
      ? goToNewSlide(active - 1)
      : goToNewSlide(previous);
    return true;
  };

  const limitToSlide = deviceMaxWidth * 0.5;
  const slidesMaxWidth = (numberOfSlides - 1) * deviceMaxWidth;
  const navContainerMaxSize = deviceMaxWidth * navContainerMaxSizePercent;
  const buttonsMaxSize = (deviceMaxWidth - navContainerMaxSize) / 2 - 1;
  const dotMaxPossibleWidth = navContainerMaxSize / (numberOfSlides - 1) + 9;
  const isLastSlide = active + 1 === numberOfSlides;

  useEffect(() => {
    const panResponderItem = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0;
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0;
      },
      onStartShouldSetPanResponderCapture: () => false,
      onPanResponderMove: (_, gesture) => {
        _onGestureEvent(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        _onHandlerStateChange(gesture.dx);
      },
    });
    setPanResponder(panResponderItem);
    const animateSlide = Animated.spring(_moveSlideX, {
      toValue: marginLeft,
      speed: animateSlideSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    const animateDotWidth = Animated.spring(_moveSlideDotX, {
      toValue: dotWidth,
      speed: animateDotSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    const animateDotMarginLeft = Animated.spring(_moveSlideDotMarginX, {
      toValue: dotMarginLeft,
      speed: animateDotSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    const animateOpacityOfNext = Animated.spring(_opacityOfNextButton, {
      toValue: expectOpacityOfNext,
      speed: animateDotSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    const animateOpacityOfDone = Animated.spring(_opacityOfDoneButton, {
      toValue: expectOpacityOfDone,
      speed: animateDotSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    const animateOpacityOfSkip = Animated.spring(_opacityOfSkipButton, {
      toValue: expectOpacityOfSkip,
      speed: animateDotSpeed,
      bounciness: animateDotBouncing,
      useNativeDriver: false,
    });
    Animated.parallel([
      animateSlide,
      animateDotWidth,
      animateDotMarginLeft,
      animateOpacityOfNext,
      animateOpacityOfDone,
      animateOpacityOfSkip,
    ]).start();
  }, [slide]);

  // Based on React navigation lifecycle issue:
  // https://reactnavigation.org/docs/custom-android-back-button-handling/#why-not-use-component-lifecycle-methods
  if (hasReactNavigation) {
    useCustomBackHandlerEffect(
      active,
      onBackPress,
      backHandlerBehaviour,
      slide,
      setSlide,
      numberOfSlides,
      onDone,
      navContainerMaxSize,
      dotWidth,
      deviceMaxWidth
    );
  } else {
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => onBackPress());

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () =>
          onBackPress()
        );
    }, [active]);
  }

  const contextValue = {
    ...props,
    panResponderState,
    sliderState,
    animations,
    numberOfSlides,
    navContainerMaxSize,
    dotMaxPossibleWidth,
    buttonsMaxSize,
    isLastSlide,
    goToNewSlide,
    setDefaultState,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      {props.children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;

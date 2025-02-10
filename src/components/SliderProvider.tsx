import React, {
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Animated, Dimensions, Easing, useAnimatedValue } from 'react-native';
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
};

export const SliderContext = createContext<SliderContextProps>({
  ...defaultProps,
  numberOfSlides: defaultProps.data?.length ?? 1,
  navContainerMaxSize: 0,
  dotMaxPossibleWidth: 0,
  buttonsMaxSize: 0,
  slidesMaxWidth: 0,
  limitToSlide: 0,
  slide: defaultSlideState,
  setDefaultState: () => {},
  animations: Object.create(null),
  goToNewSlide: () => {},
  isLastSlide: false,
});

const deviceMaxWidth = Dimensions.get('window').width;

const SliderProvider = (props: SliderProviderProps) => {
  const {
    data = [],
    children = null,
    animateSlideSpeed = 15,
    navContainerMaxSizePercent = 0.5,
    dotWidth = 12,
    animateDotSpeed = 8,
    animateDotBouncing = 2,
    onDone = () => {},
    isCustomRender,
  } = props;

  const numberOfSlides = isCustomRender
    ? props?.numberOfSlides
    : (data?.length ?? 1);

  const slidesMaxWidth = (numberOfSlides - 1) * deviceMaxWidth;
  const navContainerMaxSize = deviceMaxWidth * navContainerMaxSizePercent;
  const buttonsMaxSize = (deviceMaxWidth - navContainerMaxSize) / 2 - 1;
  const dotMaxPossibleWidth = navContainerMaxSize / (numberOfSlides - 1) + 9;
  const _moveSlideTranslateX = useAnimatedValue(0);
  const _slideDotScaleX = useAnimatedValue(1);
  const _slideDotTranslateX = useAnimatedValue(0);
  const _opacityOfNextButton = useAnimatedValue(0);
  const _opacityOfDoneButton = useAnimatedValue(0);
  const _opacityOfSkipButton = useAnimatedValue(0);

  const sliderState = useState<Slide>(defaultSlideState);
  const [slide, setSlide] = sliderState;

  const {
    active,
    marginLeft,
    dotMarginLeft,
    expectOpacityOfNext,
    expectOpacityOfDone,
    expectOpacityOfSkip,
  } = slide;

  const animateSlide = useMemo(
    () =>
      Animated.spring(_moveSlideTranslateX, {
        toValue: marginLeft,
        speed: animateSlideSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [marginLeft, animateSlideSpeed, animateDotBouncing, _moveSlideTranslateX]
  );

  const animateDotWidth = useMemo(
    () =>
      Animated.spring(_slideDotScaleX, {
        toValue: 1,
        speed: animateDotSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [_slideDotScaleX, animateDotBouncing, animateDotSpeed]
  );

  const animateDotMarginLeft = useMemo(
    () =>
      Animated.spring(_slideDotTranslateX, {
        toValue: dotMarginLeft,
        speed: animateDotSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [dotMarginLeft, animateDotSpeed, animateDotBouncing, _slideDotTranslateX]
  );

  const animateOpacityOfNext = useMemo(
    () =>
      Animated.timing(_opacityOfNextButton, {
        toValue: expectOpacityOfNext,
        duration: animateDotSpeed,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    [expectOpacityOfNext, animateDotSpeed, _opacityOfNextButton]
  );

  const animateOpacityOfDone = useMemo(
    () =>
      Animated.timing(_opacityOfDoneButton, {
        toValue: expectOpacityOfDone,
        duration: animateDotSpeed,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    [expectOpacityOfDone, animateDotSpeed, _opacityOfDoneButton]
  );

  const animateOpacityOfSkip = useMemo(
    () =>
      Animated.timing(_opacityOfSkipButton, {
        toValue: expectOpacityOfSkip,
        duration: animateDotSpeed,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    [expectOpacityOfSkip, animateDotSpeed, _opacityOfSkipButton]
  );

  useLayoutEffect(() => {
    const animationGroup = Animated.parallel([
      animateSlide,
      animateDotWidth,
      animateDotMarginLeft,
      animateOpacityOfNext,
      animateOpacityOfDone,
      animateOpacityOfSkip,
    ]);
    animationGroup.start();
    return () => animationGroup.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  const goToNewSlide = (newSlide: number) => {
    if (newSlide < 0) {
      return;
    }
    if (newSlide > numberOfSlides - 1) {
      setSlide(defaultSlideState);
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
    });
  };

  const contextValue = {
    ...props,
    slide,
    setDefaultState: () => setSlide(defaultSlideState),
    isLastSlide: active + 1 === numberOfSlides,
    goToNewSlide,
    animations: {
      _moveSlideTranslateX,
      _slideDotScaleX,
      _slideDotTranslateX,
      _opacityOfNextButton,
      _opacityOfDoneButton,
      _opacityOfSkipButton,
    },
    slidesMaxWidth,
    navContainerMaxSize,
    buttonsMaxSize,
    dotMaxPossibleWidth,
    numberOfSlides,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  );
};

export default SliderProvider;

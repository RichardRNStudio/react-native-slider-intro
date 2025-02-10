import React, {
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Animated, Dimensions, Easing, useAnimatedValue } from 'react-native';
import type { Slide } from '../types/Slide.types';
import type {
  SliderContextProps,
  SliderProviderProps,
} from '../types/SliderProvider.types';
import { ButtonType } from '../types/Button.types';

const defaultSlideState: Slide = {
  active: 0,
  previous: 0,
  slideToValue: 0,
  dotWidthToValue: 0,
  expectOpacityOfNext: 1,
  expectOpacityOfDone: 0,
  expectOpacityOfSkip: 1,
};

const deviceMaxWidth = Dimensions.get('window').width;

export const SliderContext = createContext<SliderContextProps>({
  data: [],
  children: null,
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
  showLeftButton: true,
  leftButtonType: ButtonType.Skip,
  columnButtonStyle: false,
  limitToSlide: deviceMaxWidth * 0.35,
  renderSkipButton: () => null,
  renderNextButton: () => null,
  renderDoneButton: () => null,
  skipLabel: ButtonType.Skip,
  nextLabel: ButtonType.Next,
  doneLabel: ButtonType.Done,
  onDone: () => {},
  onSkip: () => {},
  numberOfSlides: 1,
  navContainerMaxSize: 0,
  dotMaxPossibleWidth: 0,
  buttonsMaxSize: 0,
  slidesMaxWidth: 0,
  slide: defaultSlideState,
  setDefaultState: () => {},
  animations: Object.create(null),
  goToNewSlide: () => {},
  isLastSlide: false,
});

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
    ? (props?.numberOfSlides ?? 1)
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
    slideToValue,
    dotWidthToValue,
    expectOpacityOfNext,
    expectOpacityOfDone,
    expectOpacityOfSkip,
  } = slide;

  const slideAnimation = useMemo(
    () =>
      Animated.spring(_moveSlideTranslateX, {
        toValue: slideToValue,
        speed: animateSlideSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [slideToValue, animateSlideSpeed, animateDotBouncing, _moveSlideTranslateX]
  );

  const dotAnimation = useMemo(
    () =>
      Animated.spring(_slideDotScaleX, {
        toValue: 1,
        speed: animateDotSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [_slideDotScaleX, animateDotBouncing, animateDotSpeed]
  );

  const dotWidthAnimation = useMemo(
    () =>
      Animated.spring(_slideDotTranslateX, {
        toValue: dotWidthToValue,
        speed: animateDotSpeed,
        bounciness: animateDotBouncing,
        useNativeDriver: true,
      }),
    [dotWidthToValue, animateDotSpeed, animateDotBouncing, _slideDotTranslateX]
  );

  const nextOpacityAnimation = useMemo(
    () =>
      Animated.timing(_opacityOfNextButton, {
        toValue: expectOpacityOfNext,
        duration: animateDotSpeed,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    [expectOpacityOfNext, animateDotSpeed, _opacityOfNextButton]
  );

  const doneOpacityAnimation = useMemo(
    () =>
      Animated.timing(_opacityOfDoneButton, {
        toValue: expectOpacityOfDone,
        duration: animateDotSpeed,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    [expectOpacityOfDone, animateDotSpeed, _opacityOfDoneButton]
  );

  const skipOpacityAnimation = useMemo(
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
      slideAnimation,
      dotAnimation,
      dotWidthAnimation,
      nextOpacityAnimation,
      doneOpacityAnimation,
      skipOpacityAnimation,
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
      expectedMarginLeft = slideToValue;
    }

    setSlide({
      active: newSlide,
      previous: active,
      dotWidthToValue: expectedMarginLeftDot,
      slideToValue: expectedMarginLeft,
      expectOpacityOfNext: opacityOfNext,
      expectOpacityOfDone: opacityOfDone,
      expectOpacityOfSkip: opacityOfSkip,
    });
  };

  const contextValue = {
    data: props?.data ?? [],
    children: props?.children ?? null,
    navigationBarBottom: props?.navigationBarBottom ?? 0,
    navigationBarHeight: props?.navigationBarHeight ?? 70,
    animateSlideSpeed: props?.animateSlideSpeed ?? 15,
    navContainerMaxSizePercent: props?.navContainerMaxSizePercent ?? 0.5,
    dotWidth: props?.dotWidth ?? 12,
    fixDotOpacity: props?.fixDotOpacity ?? 0.35,
    fixDotBackgroundColor: props?.fixDotBackgroundColor ?? 'grey',
    animatedDotBackgroundColor: props?.animatedDotBackgroundColor ?? 'white',
    animateDotSpeed: props?.animateDotSpeed ?? 8,
    animateDotBouncing: props?.animateDotBouncing ?? 2,
    showLeftButton: props?.showLeftButton ?? true,
    leftButtonType: props?.leftButtonType ?? ButtonType.Skip,
    columnButtonStyle: !!props?.columnButtonStyle,
    limitToSlide: props?.limitToSlide ?? deviceMaxWidth * 0.35,
    renderSkipButton: props?.renderSkipButton,
    renderNextButton: props?.renderNextButton,
    renderDoneButton: props?.renderDoneButton,
    onDone: props?.onDone,
    onSkip: props?.onSkip,
    skipLabel: props?.skipLabel ?? ButtonType.Skip,
    doneLabel: props?.doneLabel ?? ButtonType.Done,
    nextLabel: props?.nextLabel ?? ButtonType.Next,
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

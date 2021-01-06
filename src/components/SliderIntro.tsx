import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  View,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ISlide } from '../interfaces/ISlide.interface';
import SkipButton from './SkipButton';
import NextButton from './NextButton';
import DoneButton from './DoneButton';
import Item from './Item';
import { ISliderIntro } from 'src/interfaces/ISliderIntro.interface';
import { IData } from 'src/interfaces/IData.interface';

const setDefaultState = (setSlide: (arg0: ISlide) => void) => {
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

const goToNewSlide = (
  newSlide: number,
  slide: ISlide,
  setSlide: (arg0: ISlide) => void,
  numberOfSlide: number,
  onDone: () => void,
  navContainerMaxSize: number,
  dotWidth: number,
  deviceMaxSize: number
) => {
  if (newSlide < 0) {
    return;
  }
  if (newSlide > numberOfSlide - 1) {
    setDefaultState(setSlide);
    onDone();
    return;
  }

  let expectOpacityOfNext = 0;
  let expectOpacityOfDone = 0;
  let expectOpacityOfSkip = 0;
  let expectedMarginLeft = 0;
  let expectedMarginLeftDot =
    (newSlide * (navContainerMaxSize - numberOfSlide * dotWidth)) /
      (numberOfSlide - 1) +
    newSlide * dotWidth;

  if (newSlide === numberOfSlide - 1) {
    expectOpacityOfNext = 0;
    expectOpacityOfDone = 1;
    expectOpacityOfSkip = 0;
  } else {
    expectOpacityOfNext = 1;
    expectOpacityOfDone = 0;
    expectOpacityOfSkip = 1;
  }

  const { active, marginLeft, animations } = slide;
  const {
    _moveSlideX,
    _moveSlideDotX,
    _moveSlideDotMarginX,
    _opacityOfNextButton,
    _opacityOfDoneButton,
    _opacityOfSkipButton,
  } = animations;

  if (newSlide > active) {
    expectedMarginLeft = -(newSlide * deviceMaxSize);
  } else if (newSlide < active) {
    expectedMarginLeft = -(newSlide * deviceMaxSize);
  } else {
    expectedMarginLeft = marginLeft;
  }
  setSlide({
    active: newSlide,
    previous: active,
    dotMarginLeft: expectedMarginLeftDot,
    marginLeft: expectedMarginLeft,
    expectOpacityOfNext: expectOpacityOfNext,
    expectOpacityOfDone: expectOpacityOfDone,
    expectOpacityOfSkip: expectOpacityOfSkip,
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

const _onGestureEvent = (
  translationX: number,
  slide: ISlide,
  dotMaxPossibleWidth: number,
  deviceMaxSize: number,
  dotWidth: number,
  slidesMaxWidth: number
) => {
  const { marginLeft, dotMarginLeft, animations } = slide;
  const { _moveSlideX, _moveSlideDotX, _moveSlideDotMarginX } = animations;
  const newValue = translationX + marginLeft;
  const newDotWidthRawValue =
    dotMaxPossibleWidth / (deviceMaxSize / translationX);
  const newDotWidthValue =
    translationX < 0 ? -1 * newDotWidthRawValue : newDotWidthRawValue;

  if (newValue > 0) {
    _moveSlideDotMarginX.setValue(dotMarginLeft);
    _moveSlideX.setValue(0);
    _moveSlideDotX.setValue(dotWidth);
  } else if (newValue < -slidesMaxWidth) {
    _moveSlideDotMarginX.setValue(dotMarginLeft);
    _moveSlideX.setValue(marginLeft);
    _moveSlideDotX.setValue(dotWidth);
  } else {
    _moveSlideX.setValue(newValue);

    if (newDotWidthValue <= dotWidth) {
      _moveSlideDotMarginX.setValue(dotMarginLeft);
      _moveSlideDotX.setValue(dotWidth);
    } else {
      if (translationX < 0) {
        _moveSlideDotMarginX.setValue(dotMarginLeft);
      } else {
        _moveSlideDotMarginX.setValue(
          dotMarginLeft - newDotWidthValue + dotWidth
        );
      }
      _moveSlideDotX.setValue(newDotWidthValue);
    }
  }
};

const _onHandlerStateChange = (
  translationX: number,
  slide: ISlide,
  slidesMaxWidth: number,
  limitToSlide: number,
  setSlide: (arg0: ISlide) => void,
  numberOfSlide: number,
  onDone: () => void,
  navContainerMaxSize: number,
  dotWidth: number,
  deviceMaxSize: number
) => {
  const { marginLeft, active } = slide;
  const newValue = translationX + marginLeft;
  if (newValue <= 0 && newValue >= -slidesMaxWidth) {
    let absoluteTranslation = 0;
    if (translationX < 0) {
      absoluteTranslation = translationX * -1;
      if (absoluteTranslation > limitToSlide) {
        goToNewSlide(
          active + 1,
          slide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        );
      } else {
        goToNewSlide(
          active,
          slide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        );
      }
    } else {
      absoluteTranslation = translationX;
      if (absoluteTranslation > limitToSlide) {
        goToNewSlide(
          active - 1,
          slide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        );
      } else {
        goToNewSlide(
          active,
          slide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        );
      }
    }
  }
};

const onBackPress = (
  backHandlerBehaviour: string,
  slide: ISlide,
  setSlide: (arg0: ISlide) => void,
  numberOfSlide: number,
  onDone: () => void,
  navContainerMaxSize: number,
  dotWidth: number,
  deviceMaxSize: number
) => {
  const { active, previous } = slide;
  backHandlerBehaviour === 'ActiveMinusOne'
    ? goToNewSlide(
        active - 1,
        slide,
        setSlide,
        numberOfSlide,
        onDone,
        navContainerMaxSize,
        dotWidth,
        deviceMaxSize
      )
    : goToNewSlide(
        previous,
        slide,
        setSlide,
        numberOfSlide,
        onDone,
        navContainerMaxSize,
        dotWidth,
        deviceMaxSize
      );
  return true;
};

const defaultProps: ISliderIntro = {
  data: [],
  renderItem: (item: IData) => {
    const {
      key,
      title,
      text,
      image,
      backgroundColor,
      activeLanguage,
      link,
    } = item;
    return (
      <Item
        key={key}
        title={title}
        text={text}
        image={image}
        backgroundColor={backgroundColor}
        activeLanguage={activeLanguage}
        link={link}
      />
    );
  },
  navigationBarPosition: 0,
  animateSlideSpeed: 15,
  navContainerMaxSizePercent: 0.5,
  dotWidth: 12,
  fixDotOpacity: 0.35,
  fixDotBackgroundColor: 'grey',
  animatedDotBackgroundColor: 'white',
  animateDotSpeed: 8,
  animateDotBouncing: 2,
  backHandlerBehaviour: 'ActiveMinusOne',
  hasReactNavigation: false,
  skipLabel: 'Skip',
  nextLabel: 'Next',
  doneLabel: 'Done',
  renderSkipButton: (skipLabel: string | undefined) => (
    <SkipButton skipLabel={skipLabel} />
  ),
  renderNextButton: (nextLabel: string | undefined) => (
    <NextButton nextLabel={nextLabel} />
  ),
  renderDoneButton: (doneLabel: string | undefined) => (
    <DoneButton doneLabel={doneLabel} />
  ),
  onDone: () => {},
  onSkip: () => {},
};

export function SliderIntro({
  data,
  renderItem,
  navigationBarPosition,
  animateSlideSpeed,
  navContainerMaxSizePercent,
  dotWidth,
  fixDotOpacity,
  fixDotBackgroundColor,
  animatedDotBackgroundColor,
  animateDotSpeed,
  animateDotBouncing,
  backHandlerBehaviour,
  hasReactNavigation,
  skipLabel,
  nextLabel,
  doneLabel,
  renderSkipButton,
  renderNextButton,
  renderDoneButton,
  onSkip,
  onDone,
}: ISliderIntro) {
  const [panResponder, setPanResponder] = useState(PanResponder.create({}));
  const [slide, setSlide] = useState<ISlide>({
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

  const { length: numberOfSlide = 1 } = data;
  const arrayOfSlideIndex = [...Array(numberOfSlide).keys()];
  const deviceMaxSize = Dimensions.get('window').width;
  const limitToSlide = deviceMaxSize * 0.5;
  const slidesMaxWidth = (numberOfSlide - 1) * deviceMaxSize;
  const navContainerMaxSize = deviceMaxSize * navContainerMaxSizePercent;
  const buttonsMaxSize = (deviceMaxSize - navContainerMaxSize) / 2 - 1;
  const dotMaxPossibleWidth = navContainerMaxSize / (numberOfSlide - 1) + 9;

  const {
    active,
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

  const isLastSlide = active + 1 === numberOfSlide;

  useEffect(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gesture) => {
        _onGestureEvent(
          gesture.dx,
          slide,
          dotMaxPossibleWidth,
          deviceMaxSize,
          dotWidth,
          slidesMaxWidth
        );
      },
      onPanResponderRelease: (_, gesture) => {
        _onHandlerStateChange(
          gesture.dx,
          slide,
          slidesMaxWidth,
          limitToSlide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        );
      },
    });
    setPanResponder(panResponder);
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
    useFocusEffect(
      React.useCallback(() => {
        BackHandler.addEventListener('hardwareBackPress', () =>
          onBackPress(
            backHandlerBehaviour,
            slide,
            setSlide,
            numberOfSlide,
            onDone,
            navContainerMaxSize,
            dotWidth,
            deviceMaxSize
          )
        );

        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () =>
            onBackPress(
              backHandlerBehaviour,
              slide,
              setSlide,
              numberOfSlide,
              onDone,
              navContainerMaxSize,
              dotWidth,
              deviceMaxSize
            )
          );
      }, [active])
    );
  } else {
    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () =>
        onBackPress(
          backHandlerBehaviour,
          slide,
          setSlide,
          numberOfSlide,
          onDone,
          navContainerMaxSize,
          dotWidth,
          deviceMaxSize
        )
      );

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () =>
          onBackPress(
            backHandlerBehaviour,
            slide,
            setSlide,
            numberOfSlide,
            onDone,
            navContainerMaxSize,
            dotWidth,
            deviceMaxSize
          )
        );
    }, []);
  }

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { maxWidth: numberOfSlide * deviceMaxSize },
          { marginLeft: _moveSlideX },
        ]}
        {...panResponder.panHandlers}
      >
        {data.map((item: IData, index: number) => {
          return (
            <View key={index} style={{ width: deviceMaxSize }}>
              {renderItem(item)}
            </View>
          );
        })}
      </Animated.View>
      <View
        style={[
          styles.navContainer,
          {
            bottom: navigationBarPosition,
          },
        ]}
      >
        <View style={styles.navigation}>
          <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
            <TouchableOpacity
              onPress={() => {
                setDefaultState(setSlide);
                onSkip();
              }}
            >
              <Animated.View
                style={{
                  maxWidth: buttonsMaxSize,
                  opacity: _opacityOfSkipButton,
                }}
              >
                {renderSkipButton(skipLabel)}
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View
            style={[styles.dotMainContainer, { maxWidth: navContainerMaxSize }]}
          >
            <View
              style={[
                styles.mainDotContainer,
                { maxWidth: navContainerMaxSize },
              ]}
            >
              <View style={styles.mainDotInnerContainer}>
                {arrayOfSlideIndex.map((item) => {
                  return (
                    <View
                      key={item}
                      style={[
                        styles.fixDot,
                        {
                          backgroundColor: fixDotBackgroundColor,
                          opacity: fixDotOpacity,
                          width: dotWidth,
                          maxWidth: dotWidth,
                          height: dotWidth,
                          maxHeight: dotWidth,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            </View>
            <View style={[styles.animatedDotContainer]}>
              <View style={styles.animatedDotInnerContainer}>
                <Animated.View
                  style={[
                    styles.animatedDot,
                    {
                      width: _moveSlideDotX,
                      maxWidth: _moveSlideDotX,
                      height: dotWidth,
                      maxHeight: dotWidth,
                      marginLeft: _moveSlideDotMarginX,
                      backgroundColor: animatedDotBackgroundColor,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
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
                  deviceMaxSize
                )
              }
            >
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
        </View>
      </View>
    </>
  );
}

SliderIntro.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  navContainer: {
    position: 'absolute',
    width: '100%',
    maxWidth: '100%',
    height: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 0,
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDotContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  animatedDotContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
  },
  mainDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fixDot: {
    flex: 1,
    borderRadius: 100,
  },
  animatedDotInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  animatedDot: {
    flex: 1,
    borderRadius: 100,
  },
  prevContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
});

export default SliderIntro;

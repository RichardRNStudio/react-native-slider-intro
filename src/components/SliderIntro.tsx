import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  View,
  BackHandler,
  StyleSheet,
  PanResponder,
} from 'react-native';
import { ISlide } from '../interfaces/ISlide.interface';
import SkipButton from './SkipButton';
import NextButton from './NextButton';
import DoneButton from './DoneButton';
import NextContainer from './NextContainer';
import Item from './Item';
import { ISliderIntro } from 'src/interfaces/ISliderIntro.interface';
import { IItem } from 'src/interfaces/IItem.interface';
import PrevContainer from './PrevContainer';
import DotContainer from './DotContainer';
import StatusBarContainer from './StatusBarContainer';

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
  deviceMaxWidth: number
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
  deviceMaxWidth: number,
  dotWidth: number,
  slidesMaxWidth: number
) => {
  const { marginLeft, dotMarginLeft, animations } = slide;
  const { _moveSlideX, _moveSlideDotX, _moveSlideDotMarginX } = animations;
  const newValue = translationX + marginLeft;
  const newDotWidthRawValue =
    dotMaxPossibleWidth / (deviceMaxWidth / translationX);
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
  deviceMaxWidth: number
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
          deviceMaxWidth
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
          deviceMaxWidth
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
          deviceMaxWidth
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
          deviceMaxWidth
        );
      }
    }
  }
};

const onBackPress = (
  backHandlerBehaviour: 'activeMinusOne' | 'previous',
  slide: ISlide,
  setSlide: (arg0: ISlide) => void,
  numberOfSlide: number,
  onDone: () => void,
  navContainerMaxSize: number,
  dotWidth: number,
  deviceMaxWidth: number
) => {
  const { active, previous } = slide;
  backHandlerBehaviour === 'activeMinusOne'
    ? goToNewSlide(
        active - 1,
        slide,
        setSlide,
        numberOfSlide,
        onDone,
        navContainerMaxSize,
        dotWidth,
        deviceMaxWidth
      )
    : goToNewSlide(
        previous,
        slide,
        setSlide,
        numberOfSlide,
        onDone,
        navContainerMaxSize,
        dotWidth,
        deviceMaxWidth
      );
  return true;
};

const defaultProps: ISliderIntro = {
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
  showLeftButton: true,
  leftButtonType: 'skip',
  columnButtonStyle: false,
  showStatusBar: false,
  statusBarColor: '#febe29',
};

export function SliderIntro({
  data,
  renderItem,
  navigationBarBottom,
  navigationBarHeight,
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
  useCustomBackHandlerEffect,
  skipLabel,
  nextLabel,
  doneLabel,
  renderSkipButton,
  renderNextButton,
  renderDoneButton,
  onSkip,
  onDone,
  showLeftButton,
  leftButtonType,
  columnButtonStyle,
  showStatusBar,
  statusBarColor,
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
  const deviceMaxWidth = Dimensions.get('window').width;
  const limitToSlide = deviceMaxWidth * 0.5;
  const slidesMaxWidth = (numberOfSlide - 1) * deviceMaxWidth;
  const navContainerMaxSize = deviceMaxWidth * navContainerMaxSizePercent;
  const buttonsMaxSize = (deviceMaxWidth - navContainerMaxSize) / 2 - 1;
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
    const panResponderItem = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        return gestureState.dx != 0 && gestureState.dy != 0;
      },
      onStartShouldSetPanResponderCapture: () => false,
      onPanResponderMove: (_, gesture) => {
        _onGestureEvent(
          gesture.dx,
          slide,
          dotMaxPossibleWidth,
          deviceMaxWidth,
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
          deviceMaxWidth
        );
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
      numberOfSlide,
      onDone,
      navContainerMaxSize,
      dotWidth,
      deviceMaxWidth
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
          deviceMaxWidth
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
            deviceMaxWidth
          )
        );
    }, [active]);
  }

  return (
    <>
      {showStatusBar && <StatusBarContainer backgroundColor={statusBarColor} />}
      <Animated.View
        style={[
          styles.container,
          {
            maxWidth: numberOfSlide * deviceMaxWidth,
            marginLeft: _moveSlideX,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {data.map((item: IItem, index: number) => {
          return (
            <View
              key={index}
              style={{
                width: deviceMaxWidth,
              }}
            >
              {renderItem(item)}
            </View>
          );
        })}
      </Animated.View>
      <View
        style={[
          styles.navContainer,
          {
            bottom: navigationBarBottom,
            height: navigationBarHeight,
            maxHeight: navigationBarHeight,
          },
        ]}
      >
        <View
          style={[
            styles.navigation,
            { flexDirection: columnButtonStyle ? 'column' : 'row' },
          ]}
        >
          {columnButtonStyle ? (
            <>
              <DotContainer
                navContainerMaxSize={navContainerMaxSize}
                arrayOfSlideIndex={arrayOfSlideIndex}
                fixDotBackgroundColor={fixDotBackgroundColor}
                fixDotOpacity={fixDotOpacity}
                dotWidth={dotWidth}
                _moveSlideDotX={_moveSlideDotX}
                _moveSlideDotMarginX={_moveSlideDotMarginX}
                animatedDotBackgroundColor={animatedDotBackgroundColor}
              />
              <NextContainer
                goToNewSlide={goToNewSlide}
                slide={slide}
                setSlide={setSlide}
                numberOfSlide={numberOfSlide}
                onDone={onDone}
                navContainerMaxSize={navContainerMaxSize}
                dotWidth={dotWidth}
                deviceMaxWidth={deviceMaxWidth}
                renderNextButton={() => renderNextButton(nextLabel)}
                renderDoneButton={() => renderDoneButton(doneLabel)}
                isLastSlide={isLastSlide}
                buttonsMaxSize={buttonsMaxSize}
              />
              <PrevContainer
                setDefaultState={() => setDefaultState(setSlide)}
                onSkip={onSkip}
                buttonsMaxSize={buttonsMaxSize}
                _opacityOfSkipButton={_opacityOfSkipButton}
                renderSkipButton={() => renderSkipButton(skipLabel)}
                type={leftButtonType}
                goToNewSlide={goToNewSlide}
                slide={slide}
                setSlide={setSlide}
                numberOfSlide={numberOfSlide}
                onDone={onDone}
                navContainerMaxSize={navContainerMaxSize}
                dotWidth={dotWidth}
                deviceMaxWidth={deviceMaxWidth}
                showLeftButton={showLeftButton}
              />
            </>
          ) : (
            <>
              <PrevContainer
                setDefaultState={() => setDefaultState(setSlide)}
                onSkip={onSkip}
                buttonsMaxSize={buttonsMaxSize}
                _opacityOfSkipButton={_opacityOfSkipButton}
                renderSkipButton={() => renderSkipButton(skipLabel)}
                type={leftButtonType}
                goToNewSlide={goToNewSlide}
                slide={slide}
                setSlide={setSlide}
                numberOfSlide={numberOfSlide}
                onDone={onDone}
                navContainerMaxSize={navContainerMaxSize}
                dotWidth={dotWidth}
                deviceMaxWidth={deviceMaxWidth}
                showLeftButton={showLeftButton}
              />
              <DotContainer
                navContainerMaxSize={navContainerMaxSize}
                arrayOfSlideIndex={arrayOfSlideIndex}
                fixDotBackgroundColor={fixDotBackgroundColor}
                fixDotOpacity={fixDotOpacity}
                dotWidth={dotWidth}
                _moveSlideDotX={_moveSlideDotX}
                _moveSlideDotMarginX={_moveSlideDotMarginX}
                animatedDotBackgroundColor={animatedDotBackgroundColor}
              />
              <NextContainer
                goToNewSlide={goToNewSlide}
                slide={slide}
                setSlide={setSlide}
                numberOfSlide={numberOfSlide}
                onDone={onDone}
                navContainerMaxSize={navContainerMaxSize}
                dotWidth={dotWidth}
                deviceMaxWidth={deviceMaxWidth}
                renderNextButton={() => renderNextButton(nextLabel)}
                renderDoneButton={() => renderDoneButton(doneLabel)}
                isLastSlide={isLastSlide}
                buttonsMaxSize={buttonsMaxSize}
              />
            </>
          )}
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prevContainer: {
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

import React, { useContext, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  type PanResponderCallbacks,
} from 'react-native';
import Navigation from './components/Navigation';
import Slide from './components/Slide';
import SliderProvider, { SliderContext } from './components/SliderProvider';
import { type SliderIntroProps } from './types/SliderIntro.types';
import type { SliderIntroItemProps } from './types/SliderIntroItem.types';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
});

const deviceMaxWidth = Dimensions.get('window').width;

const Slider = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    numberOfSlides,
    dotWidth = 12,
    slidesMaxWidth,
    limitToSlide,
    dotMaxPossibleWidth,
    slide,
    goToNewSlide,
    animations,
  } = useContext(SliderContext);
  const { active, slideToValue, dotWidthToValue } = slide;
  const { _moveSlideTranslateX, _slideDotScaleX, _slideDotTranslateX } =
    animations;

  const panResponderConfig: PanResponderCallbacks = useMemo(() => {
    const _onGestureEvent = (translationX: number) => {
      const newValue = translationX + slideToValue;
      const newDotWidthRawValue =
        dotMaxPossibleWidth / (deviceMaxWidth / translationX);
      const newDotWidthValue =
        translationX < 0 ? -1 * newDotWidthRawValue : newDotWidthRawValue;

      if (newValue > 0) {
        _slideDotTranslateX.setValue(dotWidthToValue);
        _moveSlideTranslateX.setValue(0);
        _slideDotScaleX.setValue(1);
        return;
      }
      if (newValue < -slidesMaxWidth) {
        _slideDotTranslateX.setValue(dotWidthToValue);
        _moveSlideTranslateX.setValue(slideToValue);
        _slideDotScaleX.setValue(1);
        return;
      }
      _moveSlideTranslateX.setValue(newValue);

      if (newDotWidthValue <= dotWidth) {
        _slideDotTranslateX.setValue(dotWidthToValue);
        _slideDotScaleX.setValue(1);
        return;
      }

      const newDotWidth =
        newDotWidthValue / dotWidth < 3 ? newDotWidthValue / dotWidth : 3;

      if (translationX < 0) {
        _slideDotTranslateX.setValue(
          dotWidthToValue + newDotWidthValue - dotWidth
        );
        _slideDotScaleX.setValue(newDotWidth);

        return;
      }
      _slideDotTranslateX.setValue(
        dotWidthToValue - newDotWidthValue + dotWidth
      );
      _slideDotScaleX.setValue(newDotWidth);
    };

    const _onHandlerStateChange = (translationX: number) => {
      const newValue = translationX + slideToValue;
      if (!(newValue <= 0 && newValue >= -slidesMaxWidth)) {
        return;
      }
      let absoluteTranslation = 0;
      if (translationX < 0) {
        absoluteTranslation = translationX * -1;
        if (limitToSlide && absoluteTranslation > limitToSlide) {
          goToNewSlide(active + 1);
          return;
        }
        goToNewSlide(active);
        return;
      }
      absoluteTranslation = translationX;
      if (limitToSlide && absoluteTranslation > limitToSlide) {
        goToNewSlide(active - 1);
        return;
      }
      goToNewSlide(active);
    };

    return {
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
    };
  }, [
    _slideDotTranslateX,
    _slideDotScaleX,
    _moveSlideTranslateX,
    active,
    dotWidthToValue,
    dotMaxPossibleWidth,
    dotWidth,
    goToNewSlide,
    limitToSlide,
    slideToValue,
    slidesMaxWidth,
  ]);

  const panResponder = PanResponder.create(panResponderConfig);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          maxWidth: numberOfSlides * deviceMaxWidth,
          transform: [{ translateX: _moveSlideTranslateX }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {children ? (
        <>{children}</>
      ) : (
        <>
          {data?.map((item: SliderIntroItemProps, index) => (
            <View
              key={index}
              style={{
                width: deviceMaxWidth,
              }}
            >
              <Slide item={item} />
            </View>
          ))}
        </>
      )}
    </Animated.View>
  );
};

const SliderIntro = (props: Partial<SliderIntroProps>) => (
  <SliderProvider {...props} isCustomRender={!!props.children}>
    <Slider children={props.children} />
    <Navigation />
  </SliderProvider>
);

export default SliderIntro;
export { type SliderIntroItemProps, type SliderIntroProps };

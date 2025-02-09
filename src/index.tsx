import React, { useContext, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  type PanResponderCallbacks,
} from 'react-native';
import Item from './components/Item';
import Navigation from './components/Navigation';
import SliderProvider, { SliderContext } from './components/SliderProvider';
import defaultProps from './defaultProps';
import type { SliderIntroProps } from './types/SliderIntro.types';
import type { SliderIntroItemProps } from './types/SliderIntroItem.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const deviceMaxWidth = Dimensions.get('window').width;

const Slider = ({ children }: { children: React.ReactNode }) => {
  const {
    showStatusBar,
    renderStatusBar,
    statusBarColor,
    data,
    numberOfSlides,
    dotWidth,
    slidesMaxWidth,
    limitToSlide,
    dotMaxPossibleWidth,
    slide,
    goToNewSlide,
    animations,
  } = useContext(SliderContext);
  const { active, marginLeft, dotMarginLeft } = slide;
  const { _moveSlideTranslateX, _slideDotScaleX, _slideDotTranslateX } =
    animations;

  const panResponderConfig: PanResponderCallbacks = useMemo(() => {
    const _onGestureEvent = (translationX: number) => {
      const newValue = translationX + marginLeft;
      const newDotWidthRawValue =
        dotMaxPossibleWidth / (deviceMaxWidth / translationX);
      const newDotWidthValue =
        translationX < 0 ? -1 * newDotWidthRawValue : newDotWidthRawValue;

      if (newValue > 0) {
        _slideDotTranslateX.setValue(dotMarginLeft);
        _moveSlideTranslateX.setValue(0);
        _slideDotScaleX.setValue(1);
        return;
      }
      if (newValue < -slidesMaxWidth) {
        _slideDotTranslateX.setValue(dotMarginLeft);
        _moveSlideTranslateX.setValue(marginLeft);
        _slideDotScaleX.setValue(1);
        return;
      }
      _moveSlideTranslateX.setValue(newValue);

      if (newDotWidthValue <= dotWidth) {
        _slideDotTranslateX.setValue(dotMarginLeft);
        _slideDotScaleX.setValue(1);
        return;
      }

      const newDotWidth =
        newDotWidthValue / dotWidth < 3 ? newDotWidthValue / dotWidth : 3;

      if (translationX < 0) {
        _slideDotTranslateX.setValue(
          dotMarginLeft + newDotWidthValue - dotWidth
        );
        _slideDotScaleX.setValue(newDotWidth);

        return;
      }
      _slideDotTranslateX.setValue(dotMarginLeft - newDotWidthValue + dotWidth);
      _slideDotScaleX.setValue(newDotWidth);
    };

    const _onHandlerStateChange = (translationX: number) => {
      const newValue = translationX + marginLeft;
      if (!(newValue <= 0 && newValue >= -slidesMaxWidth)) {
        return;
      }
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
    dotMarginLeft,
    dotMaxPossibleWidth,
    dotWidth,
    goToNewSlide,
    limitToSlide,
    marginLeft,
    slidesMaxWidth,
  ]);

  const panResponder = PanResponder.create(panResponderConfig);

  return (
    <>
      {showStatusBar && renderStatusBar(statusBarColor)}
      <Animated.View
        style={[
          styles.container,
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
                <Item item={item} />
              </View>
            ))}
          </>
        )}
      </Animated.View>
    </>
  );
};

const SliderIntro = (props: SliderIntroProps) => {
  return (
    <SliderProvider {...props} isCustomRender={!!props.children}>
      <>
        <Slider children={props.children} />
        <Navigation />
      </>
    </SliderProvider>
  );
};

export default SliderIntro;
export { type SliderIntroItemProps, type SliderIntroProps };

SliderIntro.defaultProps = defaultProps;

import React, { useContext } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Navigation from './components/Navigation';
import SliderProvider, { SliderContext } from './components/SliderProvider';
import defaultProps from './defaultProps';
import type { IItem } from './interfaces/IItem.interface';
import type { ISliderIntro } from './interfaces/ISliderIntro.interface';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const deviceMaxWidth = Dimensions.get('window').width;

const SliderIntroContainer = () => {
  const {
    showStatusBar,
    renderStatusBar,
    statusBarColor,
    panResponderState,
    data,
    renderItem,
    animations: { _moveSlideX },
    numberOfSlides,
  } = useContext(SliderContext);
  const [panResponder] = panResponderState;
  return (
    <>
      {showStatusBar && renderStatusBar(statusBarColor)}
      <Animated.View
        style={[
          styles.container,
          {
            maxWidth: numberOfSlides * deviceMaxWidth,
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
      <Navigation />
    </>
  );
};

export default function SliderIntro(props: ISliderIntro) {
  return (
    <SliderProvider {...props}>
      <SliderIntroContainer />
    </SliderProvider>
  );
}

SliderIntro.defaultProps = defaultProps;

import React, { useContext } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Navigation from './components/Navigation';
import SliderProvider, { SliderContext } from './components/SliderProvider';
import defaultProps from './defaultProps';
import type { ISliderIntroItem } from './interfaces/ISliderIntroItem.interface';
import type { ISliderIntro } from './interfaces/ISliderIntro.interface';
import Item from './components/Item';

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
    animations: { _moveSlideX },
    numberOfSlides,
    isCustomRender,
    children,
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
        {isCustomRender ? (
          children
        ) : (
          <>
            {data?.map((item: ISliderIntroItem) => {
              const { index } = item;
              return (
                <View
                  key={index}
                  style={{
                    width: deviceMaxWidth,
                  }}
                >
                  <Item {...item} />
                </View>
              );
            })}
          </>
        )}
      </Animated.View>
      <Navigation />
    </>
  );
};

function SliderIntro(props: ISliderIntro) {
  return (
    <SliderProvider {...props}>
      <SliderIntroContainer />
    </SliderProvider>
  );
}

export default SliderIntro;
export { type ISliderIntro, type ISliderIntroItem };

SliderIntro.defaultProps = defaultProps;

import React, { useContext } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import Navigation from './components/Navigation';
import SliderProvider, { SliderContext } from './components/SliderProvider';
import defaultProps from './defaultProps';
import type { SliderIntroItemProps } from './types/SliderIntroItem.types';
import type { SliderIntroProps } from './types/SliderIntro.types';
import Item from './components/Item';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

const deviceMaxWidth = Dimensions.get('window').width;

const SliderIntroContainer = ({ children }: { children: React.ReactNode }) => {
  const {
    showStatusBar,
    renderStatusBar,
    statusBarColor,
    panResponderState,
    data,
    sliderState,
    numberOfSlides,
  } = useContext(SliderContext);
  const [panResponder] = panResponderState;
  const [slide] = sliderState;

  const { _moveSlideX } = slide.animations;

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
        {children ? (
          <>{children}</>
        ) : (
          <>
            {data?.map((item: SliderIntroItemProps) => {
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

function SliderIntro(props: SliderIntroProps) {
  return (
    <SliderProvider {...props} isCustomRender={!!props.children}>
      <SliderIntroContainer children={props.children} />
    </SliderProvider>
  );
}

export default SliderIntro;
export { type SliderIntroProps, type SliderIntroItemProps };

SliderIntro.defaultProps = defaultProps;

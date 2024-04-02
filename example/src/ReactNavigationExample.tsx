/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// IMPORTANT: Install the react-navigation with its dependencies and create a NavigationContainer around this component for run this component.
// Now this component cannot be run, it's just an example code.
import { useFocusEffect } from '@react-navigation/native';
import type { ISlide } from '../../src/interfaces/ISlide.interface';
import React from 'react';
import { BackHandler } from 'react-native';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step4.png'),
    backgroundColor: '#84DAB2',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step2.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step3.png'),
    backgroundColor: '#bb2323',
  },
];

const ReactNavigationExample = ({
  closeExample,
}: {
  closeExample: () => void;
}) => {
  const useCustomBackHandlerEffect = (
    active: number,
    onBackPress: (
      backHandlerBehaviour: 'activeMinusOne' | 'previous',
      slide: ISlide,
      setSlide: (arg0: ISlide) => void,
      numberOfSlide: number,
      onDone: () => void,
      navContainerMaxSize: number,
      dotWidth: number,
      deviceMaxWidth: number
    ) => boolean,
    backHandlerBehaviour: 'activeMinusOne' | 'previous',
    slide: ISlide,
    setSlide: (arg0: ISlide) => void,
    numberOfSlide: number,
    onDone: () => void,
    navContainerMaxSize: number,
    dotWidth: number,
    deviceMaxWidth: number
  ) => {
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
      }, [active])
    );
  };

  return (
    <SliderIntro
      data={slides}
      hasReactNavigation={true}
      useCustomBackHandlerEffect={(
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
      ) =>
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
        )
      }
      onDone={closeExample}
      onSkip={closeExample}
    />
  );
};

export default ReactNavigationExample;

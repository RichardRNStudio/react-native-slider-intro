import React from 'react';
import SliderIntro from 'react-native-slider-intro';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowCircleRight,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step3.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step1.jpg'),
    backgroundColor: '#febe29',
  },
];

const renderNextButton = () => {
  return (
    <FontAwesomeIcon icon={faArrowCircleRight} color={'white'} size={35} />
  );
};

const renderDoneButton = () => {
  return <FontAwesomeIcon icon={faCheckCircle} color={'white'} size={35} />;
};

const renderSkipButton = () => {
  return <FontAwesomeIcon icon={faTimesCircle} color={'white'} size={35} />;
};

const CustomButtonsExample = () => {
  return (
    <SliderIntro
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      navContainerMaxSizePercent={0.3}
      data={slides}
    />
  );
};

export default CustomButtonsExample;

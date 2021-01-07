import React from 'react';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step3.png'),
    backgroundColor: '#bb2323',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step2.png'),
    backgroundColor: '#84DAB2',
  },
  {
    index: 4,
    title: 'Fourth step',
    text: 'Here you can open a custom link.',
    link: 'https://pccontroller.rnstudio.hu',
    image: require('./images/step1.png'),
    backgroundColor: '#febe29',
  },
];

const CustomStatusBarExample = ({ closeExample }) => {
  return (
    <SliderIntro
      data={slides}
      showStatusBar={true}
      statusBarDefaultColor={'#bb2323'} // when one of slides has not a backgroundColor this value will be approved
      onDone={closeExample}
      onSkip={closeExample}
    />
  );
};

export default CustomStatusBarExample;

import React from 'react';
import SliderIntro, {
  type SliderIntroItemProps,
} from 'react-native-slider-intro';

const slides: SliderIntroItemProps[] = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    link: 'https://rnstudio.hu',
    image: require('./images/step1.png'),
    backgroundColor: '#febe29',
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
    backgroundColor: '#febe29',
  },
  {
    index: 4,
    title: 'Fourth step',
    text: 'Here you can open a custom link.',
    link: 'https://rnstudio.hu',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
  },
];

const BasicExample = ({ closeExample }: { closeExample: () => void }) => (
  <SliderIntro data={slides} onDone={closeExample} onSkip={closeExample} />
);

export default BasicExample;

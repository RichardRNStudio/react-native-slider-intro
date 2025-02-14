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
    image: require('./images/basic-example.gif'),
    backgroundColor: '#bb2323',
  },
];

const GifExample = ({ closeExample }: { closeExample: () => void }) => (
  <SliderIntro data={slides} onDone={closeExample} onSkip={closeExample} />
);

export default GifExample;

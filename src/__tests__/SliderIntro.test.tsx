import React from 'react';
import renderer from 'react-test-renderer';
import SliderIntro from '../components/SliderIntro';

jest.useFakeTimers();

test('renders correctly', () => {
  const tree = renderer
    .create(
      <SliderIntro
        data={[
          {
            index: 1,
            title: 'Test title',
            text: 'Test string',
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

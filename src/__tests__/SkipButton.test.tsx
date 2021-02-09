import React from 'react';
import renderer from 'react-test-renderer';
import SkipButton from '../components/SkipButton';

test('renders correctly', () => {
  const tree = renderer.create(<SkipButton skipLabel={'TestSkip'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

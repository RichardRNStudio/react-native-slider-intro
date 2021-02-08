import React from 'react';
import renderer from 'react-test-renderer';
import NextButton from '../components/NextButton';

test('renders correctly', () => {
  const tree = renderer.create(<NextButton nextLabel={'TestNext'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../components/Button';
import { Text } from 'react-native';
import { ButtonType } from '../types/Button.types';

describe('Button', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Button label="test" type={ButtonType.Done} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays the correct label', () => {
    const component = renderer.create(
      <Button label="test" type={ButtonType.Done} />
    );
    const instance = component.root;
    const textComponent = instance.findByType(Text);
    expect(textComponent.props.children).toBe('test');
  });
});

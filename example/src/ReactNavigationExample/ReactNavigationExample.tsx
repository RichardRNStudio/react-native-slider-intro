import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FirstSliderScreen from './FirstSliderScreen';
import SecondSliderScreen from './SecondSliderScreen';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const ReactNavigationExample = ({
  closeExample,
}: {
  closeExample: () => void;
}) => (
  <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SliderOne"
          component={FirstSliderScreen}
          options={{ title: 'Slider1' }}
        />
        <Stack.Screen
          name="SliderTwo"
          component={SecondSliderScreen}
          options={{ title: 'Slider2' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <Button onPress={closeExample} title="Back to examples" />
  </>
);

export default ReactNavigationExample;

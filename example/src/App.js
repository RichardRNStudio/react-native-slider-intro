import React, { useState } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import BasicExample from './BasicExample';
import CustomButtonsExample from './CustomButtonsExample';
import ColumnButtonsExample from './ColumnButtonsExample';
import CustomStatusBarExample from './CustomStatusBarExample';

export default function App() {
  const [example, setExample] = useState(null);

  if (example === 'basic')
    return <BasicExample closeExample={() => setExample(null)} />;
  if (example === 'custom')
    return <CustomButtonsExample closeExample={() => setExample(null)} />;
  if (example === 'column')
    return <ColumnButtonsExample closeExample={() => setExample(null)} />;
  if (example === 'statusbar')
    return <CustomStatusBarExample closeExample={() => setExample(null)} />;

  return (
    <View style={styles.container}>
      <Button
        title={'Basic example'}
        color={'steelblue'}
        onPress={() => setExample('basic')}
      />
      <Button
        title={'Custom buttons example'}
        color={'steelblue'}
        onPress={() => setExample('custom')}
      />
      <Button
        title={'Column buttons example'}
        color={'steelblue'}
        onPress={() => setExample('column')}
      />
      <Button
        title={'Custom statusbar example'}
        color={'steelblue'}
        onPress={() => setExample('statusbar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get('screen').height * 0.3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

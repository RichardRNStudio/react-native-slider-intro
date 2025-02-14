import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import BasicExample from './BasicExample';
import ColumnButtonsExample from './ColumnButtonsExample';
import CustomButtonsExample from './CustomButtonsExample';
import CustomRenderFunctionExample from './CustomRenderFunctionExample';
import GifExample from './GifExample';
import PreviousButtonExample from './PreviousButtonExample';
import ReactNavigationExample from './ReactNavigationExample/ReactNavigationExample';
import StatusBarExample from './StatusBarExample';
import UsingThirdPartyLibrariesExample from './UsingThirdPartyLibrariesExample';

export default function App() {
  const [example, setExample] = useState<string | null>(null);

  if (example === 'basic')
    return <BasicExample closeExample={() => setExample(null)} />;
  if (example === 'custom')
    return <CustomButtonsExample closeExample={() => setExample(null)} />;
  if (example === 'column')
    return <ColumnButtonsExample closeExample={() => setExample(null)} />;
  if (example === 'previous')
    return <PreviousButtonExample closeExample={() => setExample(null)} />;
  if (example === 'customFunction')
    return (
      <CustomRenderFunctionExample closeExample={() => setExample(null)} />
    );
  if (example === 'statusBar')
    return <StatusBarExample closeExample={() => setExample(null)} />;
  if (example === 'navigation')
    return <ReactNavigationExample closeExample={() => setExample(null)} />;
  if (example === 'gif')
    return <GifExample closeExample={() => setExample(null)} />;
  if (example === 'thirdParty')
    return (
      <UsingThirdPartyLibrariesExample closeExample={() => setExample(null)} />
    );

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Button
          title={'1. Basic'}
          color={'steelblue'}
          onPress={() => setExample('basic')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'2. Custom buttons'}
          color={'steelblue'}
          onPress={() => setExample('custom')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'3. Column buttons'}
          color={'steelblue'}
          onPress={() => setExample('column')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'4. Previous button'}
          color={'steelblue'}
          onPress={() => setExample('previous')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'5. Custom render function'}
          color={'steelblue'}
          onPress={() => setExample('customFunction')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'6. Custom status bar'}
          color={'steelblue'}
          onPress={() => setExample('statusBar')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'7. React navigation'}
          color={'steelblue'}
          onPress={() => setExample('navigation')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'8. Gif'}
          color={'steelblue'}
          onPress={() => setExample('gif')}
        />
      </View>
      <View style={styles.row}>
        <Button
          title={'9. Using third parties'}
          color={'steelblue'}
          onPress={() => setExample('thirdParty')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    marginTop: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    maxHeight: 50,
    borderWidth: 1,
  },
});

import React, { useState } from 'react'
import { View, StyleSheet, Button, Dimensions } from 'react-native'
import BasicExample from './BasicExample'
import CustomButtonsExample from './CustomButtonsExample'
import ColumnButtonsExample from './ColumnButtonsExample'
import StatusBarExample from './StatusBarExample'
import PreviousButtonExample from './PreviousButtonExample'
import CustomRenderFunctionExample from './CustomRenderFunctionExample'
import UsingThirdPartyLibrariesExample from './UsingThirdPartyLibrariesExample'

export default function App() {
  const [example, setExample] = useState(null)

  if (example === 'basic') return <BasicExample closeExample={() => setExample(null)} />
  if (example === 'custom') return <CustomButtonsExample closeExample={() => setExample(null)} />
  if (example === 'column') return <ColumnButtonsExample closeExample={() => setExample(null)} />
  if (example === 'statusbar') return <StatusBarExample closeExample={() => setExample(null)} />
  if (example === 'previous') return <PreviousButtonExample closeExample={() => setExample(null)} />
  if (example === 'customFunction') return <CustomRenderFunctionExample closeExample={() => setExample(null)} />
  if (example === 'thirdParty') return <UsingThirdPartyLibrariesExample closeExample={() => setExample(null)} />

  return (
    <View style={styles.container}>
      <Button title={'Basic example'} color={'steelblue'} onPress={() => setExample('basic')} />
      <Button title={'Custom buttons example'} color={'steelblue'} onPress={() => setExample('custom')} />
      <Button title={'Column buttons example'} color={'steelblue'} onPress={() => setExample('column')} />
      <Button title={'Custom statusbar example'} color={'steelblue'} onPress={() => setExample('statusbar')} />
      <Button title={'Previous button example'} color={'steelblue'} onPress={() => setExample('previous')} />
      <Button title={'Custom render function example'} color={'steelblue'} onPress={() => setExample('customFunction')} />
      <Button title={'Using third party libraries'} color={'steelblue'} onPress={() => setExample('thirdParty')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

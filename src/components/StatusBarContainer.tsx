import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { IStatusBar } from 'interfaces/IStatusBar.interface'

const styles = StyleSheet.create({
  viewStyle: {
    height: 24
  }
})

const StatusBarContainer = ({ backgroundColor }: IStatusBar) => (
  <>
    <StatusBar barStyle="light-content" translucent={true} hidden={false} backgroundColor={backgroundColor} />
    {Platform.OS === 'android' && Platform.Version >= 20 ? <View style={[styles.viewStyle, { backgroundColor }]} /> : null}
  </>
)

export default StatusBarContainer

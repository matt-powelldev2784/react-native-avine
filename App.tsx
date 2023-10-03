import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getRoute } from './lib/getRoute'
import { getPositionFromAddress } from './lib/getPosition'

export default function App() {
  getRoute()
  const add1 = getPositionFromAddress(
    'glowarm central heating ltd mitcham CR4 4BE'
  )
  const add2 = getPositionFromAddress(
    '102a beddinton gardens carshalton SM5 3HQ'
  )

  return (
    <View style={styles.container}>
      <Text className="bg-blue-500">
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

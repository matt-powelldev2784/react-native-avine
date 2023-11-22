import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../screens/stackNavigator/StackNavigator'

interface ScreenMenuProps {
  title: string
  navigateTo?: keyof RootStackParamList
}

const ScreenMenu = ({ title, navigateTo }: ScreenMenuProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.menuContianer}>
      <Text style={styles.pageTitle}>{title}</Text>

      {navigateTo ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(navigateTo)}
        >
          <Image
            source={require('../../../assets/plus.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  menuContianer: {
    backgroundColor: '#ae337b',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Platform.OS === 'web' ? 18 : '5%',
    paddingVertical: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 4,
  },
  pageTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 2,
    marginBottom: 2,
    fontWeight: 'bold',
  },
})

export default ScreenMenu

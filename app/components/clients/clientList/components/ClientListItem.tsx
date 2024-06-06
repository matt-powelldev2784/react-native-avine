import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../utils/theme/theme'
import IconButton from '../../../../ui/iconButton/IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ClientWithIdT } from '../../../../types/ClientT'
import CardModal from '../../../../ui/modal/CardModal'
import ClientCard from './ClientCard'

const ClientListItem = ({ id, name, contactTel }: ClientWithIdT) => {
  // state
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleEditClientPress = () => {
    navigation.navigate('EditClient', { clientId: id })
  }
  const handleViewClientPress = () => {
    setModalVisible(true)
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.container}>
        <View style={styles.cardLeftBorder}></View>

        <View style={[styles.leftContainer]}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>

          <Text style={styles.text}>{contactTel}</Text>
        </View>

        <View style={styles.rightContainer}>
          <IconButton
            onPress={handleViewClientPress}
            imgSource={require('../../../../../assets/eye.png')}
            size={35}
          />
          <IconButton
            onPress={handleEditClientPress}
            imgSource={require('../../../../../assets/edit.png')}
            size={35}
          />
        </View>
      </View>

      {modalVisible ? (
        <CardModal
          isVisible={modalVisible}
          onCancel={() => setModalVisible(false)}
          reactElement={
            <ClientCard
              clientId={id}
              setClientCardModalVisible={setModalVisible}
            />
          }
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 70,
    overflow: 'hidden',
    maxWidth: 800,
    width: '100%',
    flex: 1,
  },
  cardLeftBorder: {
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 28,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  leftContainer: {
    flex: 1,
    marginLeft: 28,
    padding: 8,
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    gap: 12,
  },
  title: {
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 0,
  },
})

export default ClientListItem

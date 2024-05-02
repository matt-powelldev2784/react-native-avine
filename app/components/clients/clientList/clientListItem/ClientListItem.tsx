import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import theme from '../../../../utils/theme/theme'
import IconButton from '../../../../ui/iconButton/IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../ui'
import { deleteClient } from '../../../../db/clients/deleteClient'
import { ClientWithIdT } from '../../../../types/ClientT'
import usePostApiData from '../../../../utils/hooks/usePostApiData'

const ClientListItem = ({ id, name, contactTel }: ClientWithIdT) => {
  // state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { postApiIsLoading, setApiFunction } = usePostApiData({
    onSuccessScreen: 'Clients',
    refreshScreen: { refresh: true },
  })

  //functions
  const handleDeleteClientPress = () => {
    setModalVisible(true)
  }
  const handleConfirmDeleteClientPress = async () => {
    setApiFunction(() => async () => deleteClient(id))
  }
  const handleEditClientPress = () => {
    navigation.navigate('EditClient', { clientId: id })
  }
  const handleViewClientPress = () => {
     navigation.navigate('ClientCardView', { clientId: id })
  }

  //variables
  // const maxTextWidth = isLargeWeb ? 500 : 200

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.cardLeftBorder}></View>

        <View style={[styles.leftContainer]}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>

          <Text style={styles.text}>{contactTel}</Text>
        </View>

        <View style={styles.rightContainer}>
          {/* <IconButton
            onPress={handleDeleteClientPress}
            imgSource={require('../../../../../assets/bin.png')}
            size={35}
          /> */}
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

      <ConfirmModal
        modalText={`Are you sure you want to delete client ${name}?`}
        modalText2={`${name} will be deleted from view but will still be accessible for previously created jobs and invoices.`}
        onConfirm={handleConfirmDeleteClientPress}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        isLoading={postApiIsLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 70,
    overflow: 'hidden',
    width: '100%',
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

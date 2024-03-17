import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useDeviceType } from '../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../ui'
import theme from '../../../../utils/theme/theme'
import ShortNameText from '../../../../utils/shortNameText/ShortNameText'
import IconButton from '../../../../ui/iconButton/IconButton'
import usePostApiData from '../../../../utils/hooks/usePostApiData'
import { ClientWithIdT } from '../../../../types/ClientT'
import { deleteClient } from '../../../../db/clients/deleteClient'

const ClientCard = ({
  id,
  name,
  address,
  town,
  postcode,
  contactTel,
}: ClientWithIdT) => {
  // state
  const [modalVisible, setModalVisible] = useState(false)

  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()
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

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <ShortNameText text={name} />

      <View style={styles.leftContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {address}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {town}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {postcode}
          </Text>
        </View>

        <View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {contactTel}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text
            style={styles.text}
            numberOfLines={1}
            ellipsizeMode="tail"
          ></Text>
        </View>

        <View style={styles.buttons}>
          <IconButton
            onPress={handleEditClientPress}
            imgSource={require('../../../../../assets/pen.png')}
            size={35}
          />

          <IconButton
            onPress={handleDeleteClientPress}
            imgSource={require('../../../../../assets/bin.png')}
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
  cardSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
  },
  cardLargeWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: theme.colors.secondary,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexGrow: 2,
    padding: 8,
  },
  leftInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    flexGrow: 2,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
  },
  rightText: {
    flex: 1,
    alignItems: 'flex-end',
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

export default ClientCard

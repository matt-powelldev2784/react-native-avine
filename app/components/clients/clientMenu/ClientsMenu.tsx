import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme/theme'
import { useDeviceType } from '../../../utils/hooks/useDeviceTypes'
import MenuCard from './components/MenuCard'

const ClientsMenu = () => {
  const { isLargeWeb } = useDeviceType()
  const menuCardContainerMargin = isLargeWeb ? { marginTop: 50 } : null
  const deviceHeight = Dimensions.get('window').height - 95

  return (
    <View style={styles.container}>
      {/* -------------------- Header---------------------------- */}

      <View style={styles.headerContainer}>
        <Image
          source={require('../../../../assets/clients.jpg')}
          style={{ width: '100%', height: deviceHeight, marginBottom: 8 }}
        />
      </View>

      {/* -------------------- Menu Cards ---------------------------- */}
      <View style={[styles.menuCardContainer, menuCardContainerMargin]}>
        <MenuCard
          image={require('../../../../assets/plus.png')}
          text="Add Client"
          secondaryText="Click here to add a client. Every job requires a client for invoicing purposes."
          navigateTo="AddClient"
          backgroundColor={theme.colors.clientPrimary}
        />

        <MenuCard
          image={require('../../../../assets/search_white.png')}
          text="Search Clients"
          secondaryText="Click here to search the client database and view existing client details."
          navigateTo="Clients"
          backgroundColor={theme.colors.clientPrimary}
        />
      </View>

      <View style={styles.footer} />
    </View>
  )
}

export default ClientsMenu

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 20,
    marginBottom: 50,
    width: '100%',
    maxWidth: 950,
    paddingHorizontal: 16,
  },
  footer: {
    height: Platform.OS === 'android' ? 100 : 40,
    width: '100%',
    minWidth: 300,
  },
})

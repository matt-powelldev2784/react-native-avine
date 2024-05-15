import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme/theme'
import { useDeviceType } from '../../../utils/deviceTypes'
import MenuCard from './components/MenuCard'

const ClientsMenu = () => {
  const { isLargeWeb } = useDeviceType()

  return (
    <View style={styles.container}>
      {/* -------------------- Header---------------------------- */}
      {isLargeWeb ? (
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../../assets/clients.jpg')}
            style={{ width: '100%', height: 400, marginBottom: 8 }}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Add client or search client{' '}
              <span style={{ color: theme.colors.secondary }}>Database</span>
            </Text>
          </View>
        </View>
      ) : null}

      {/* -------------------- Menu Cards ---------------------------- */}
      <View style={styles.menuCardContainer}>
        <MenuCard
          number="1"
          text="Add Client"
          secondaryText="Click here to add a client. Every job requires a client for invoicing purposes."
          navigateTo="AddClient"
          backgroundColor={theme.colors.primary}
        />

        <MenuCard
          number="2"
          text="Search Clients"
          secondaryText="Click here to add a client. Every job requires a client for invoicing purposes."
          navigateTo="AddClient"
          backgroundColor={theme.colors.primary}
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
    gap: 40,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: 400,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
  },
  headerTextContainer: {
    position: 'absolute',
    height: 60,
    transform: [{ translateY: 170 }],
    maxWidth: '80%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  menuCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
    marginBottom: 50,
    width: '100%',
    maxWidth: 950,
  },
  footer: {
    height: 40,
    width: '100%',
    minWidth: 300,
  },
})

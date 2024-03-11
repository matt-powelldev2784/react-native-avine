import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Loading } from '../../../ui'
import { useDeviceType } from '../../../utils/deviceTypes'
import ErrorNoData from './errorNoData/ErrorNoData'
import theme from '../../../utils/theme/theme'
import useGetApiData from '../../../utils/hooks/useGetApiData'
import { useRoute } from '@react-navigation/native'
import { getAllClients } from '../../../db/clients/getAllClients'
import { ClientWithIdT } from '../../../types/ClientT'
import ClientCard from './clientCard/ClientCard'

const ClientList = () => {
  const route = useRoute()
  const { isSmallWeb, isLargeWeb, isNative } = useDeviceType()
  const { getApiIsLoading, data } = useGetApiData({
    apiFunction: async () => getAllClients(),
    route,
  })

  const clientData = data as ClientWithIdT[]

  if (getApiIsLoading) {
    return <Loading loadingText={'Loading client list...'} />
  }

  if (!clientData || clientData.length === 0) {
    return <ErrorNoData />
  }
  const ClientCards = clientData.map((client) => {
    return <ClientCard {...client} key={client.id} />
  })

  return (
    <View style={styles.listContainer}>
      {clientData && isLargeWeb ? (
        <View style={styles.largeWebCards}>{ClientCards}</View>
      ) : null}

      {clientData && isSmallWeb ? (
        <View style={styles.smallDeviceCards}>{ClientCards}</View>
      ) : null}

      {clientData && isNative ? (
        <FlatList
          style={styles.smallDeviceCards}
          data={clientData}
          renderItem={({ item }) => <ClientCard {...item} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.flatlistFooter} />}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'white',
  },
  largeWebCards: {
    display: 'grid' as any,
    gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))' as any,
    width: '100vw' as any,
    justifyItems: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  smallDeviceCards: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: '2.5%',
  },
  flatlistFooter: {
    height: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: '100%',
    maxWidth: 270,
    margin: 8,
    gap: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default ClientList

import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { getClient } from '../../../../db/clients/getClient'
import { Loading } from '../../../../ui'
import useGetApiData from '../../../../utils/hooks/useGetApiData'
import theme from '../../../../utils/theme/theme'

interface ClientCardProps {
  clientId: string
}

const ClientCard = ({ clientId }: ClientCardProps) => {
  console.log('clientId', clientId)

  const { getApiIsLoading, data: clientData } = useGetApiData({
    apiFunction: async () => getClient(clientId),
  })

  // if data is null show loading state
  if (getApiIsLoading || !clientData) {
    return <Loading loadingText={'Loading client details...'} />
  }

  return (
    <View style={styles.cardWrapperWeb}>
      <View style={styles.cardContainer}>
        {/* --------------------------  Title Conatiner Blue  -------------------------- */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {clientData.name}
          </Text>
        </View>

        {/* --------------------------  Info Conatiner White  -------------------------- */}
        <View style={styles.infoWrapper}>
          <Text style={styles.infoTitle}>Client Details:</Text>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapperWeb: {
    width: '100%',
    padding: 12,
    backgroundColor: theme.colors.backgroundGrey,
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: 700,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
  },
  titleContainer: {
    padding: 16,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    width: '100%',
  },
  titleText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roundIconsContainer: {
    position: 'absolute',
    top: 8,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Platform.OS === 'web' ? '96%' : '100%',
    height: 40,
  },
  dateTextContainer: {
    borderRadius: 12,
    backgroundColor: 'white',
    margin: 8,
  },
  dateText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  switchWrapper: {
    justifyContent: 'space-between',
    flexGrow: 2,
    padding: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  line: {
    height: 1,
    backgroundColor: theme.colors.primary,
  },
  infoWrapper: { padding: 8, marginBottom: 24, width: '100%' },
  infoTitle: {
    fontSize: 20,
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
  },
  warningText: {
    fontSize: 14,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
  },
})

export default ClientCard

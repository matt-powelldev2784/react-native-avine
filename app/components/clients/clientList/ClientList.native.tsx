import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import useFormikSteps from '../addClient/hooks/useFormikSteps'
import ClientListItem from './clientListItem/ClientListItem'
import { ClientWithIdT } from '../../../types/ClientT'
import Button from '../../../ui/button/Button'
import theme from '../../../utils/theme/theme'
import usePostApiData from '../../../utils/hooks/usePostApiData'
import { getAllClients } from '../../../db/clients/getAllClients'
import { DocumentSnapshot } from 'firebase/firestore'
import { useClientData } from './hooks/useClientData'

interface ClientDataT {
  lastVisible: DocumentSnapshot
  clients: ClientWithIdT[]
}

const ClientList = () => {
  //hooks
  const {
    postApiIsLoading: searchApiIsLoading,
    setApiFunction,
    data,
  } = usePostApiData<ClientDataT>({})
  const {
    clientData,
    lastVisibleDocument,
    setClientData,
    setLastVisibleDocument,
  } = useClientData(data)

  // temp
  const activeStep = 1
  const { formik } = useFormikSteps({
    activeStep,
  })

  //functions
  const handleSearchAllClientsPress = () => {
    setApiFunction(() => async () => getAllClients())
  }
  const handleNextClientsPress = () => {
    setApiFunction(() => async () => getAllClients(lastVisibleDocument))
  }
  const resetSearchForm = () => {
    setClientData([])
    setLastVisibleDocument(null)
  }

  //variables
  const clientDataHasLength = clientData.length > 0

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchTitle}>Search Clients</Text>
          <InputField
            formik={formik}
            name="name"
            placeholder="Seach Term"
            title="Search Term"
            imageName={'search'}
          />
          <Dropdown
            formik={formik}
            name="searchField"
            placeholder="Search By"
            title="Search By"
            options={[{ label: 'Name', value: 'name' }]}
            imageName={'notes'}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSearchAllClientsPress}
              text="Find All Clients"
              isLoading={searchApiIsLoading}
              backgroundColor={theme.colors.buttonSecondary}
            />
            <Button
              onPress={handleNextClientsPress}
              text="Search"
              isLoading={searchApiIsLoading}
            />
          </View>
        </View>
      </View>

      <View style={[styles.cards]}>
        {clientDataHasLength && (
          <FlatList
            style={{ width: '100%', marginBottom: 40 }}
            data={clientData}
            renderItem={({ item }) => <ClientListItem {...item} />}
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              <View style={styles.buttonContainer}>
                <Button
                  onPress={resetSearchForm}
                  text="Reset Search Form"
                  isLoading={false}
                  backgroundColor={theme.colors.buttonSecondary}
                />
                <Button
                  onPress={handleNextClientsPress}
                  text="Next 10 Results"
                  isLoading={searchApiIsLoading}
                />
              </View>
            }
          />
        )}
      </View>
    </View>
  )
}

export default ClientList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginTop: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  searchBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxWidth: 400,
    minWidth: 300,
    width: '95%',
    height: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
  searchTitle: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 600,
    gap: 8,
  },
  cards: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 40,
    width: '100%',
    minWidth: 300,
  },
})

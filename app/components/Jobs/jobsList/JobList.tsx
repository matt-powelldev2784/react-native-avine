import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import JobListItem from './components/JobListItem'
import Button from '../../../ui/button/Button'
import theme from '../../../utils/theme/theme'
import useFormikSearch from './hooks/useFormikSearch'
import { JobWithIdT } from '../../../types/JobT'
import NoDataFound from './components/NoDataFound'

const JobList = () => {
  //hooks
  const {
    searchApiIsLoading,
    formik,
    jobData,
    setJobData,
    setLastVisibleDocument,
    docCount,
  } = useFormikSearch()

  //functions
  const handleSearchAllJobsPress = () => {
    formik.setFieldValue('findAll', true)
    resetSearchForm()
    formik.handleSubmit()
  }
  const handleSearchPress = async () => {
    formik.setFieldValue('findAll', false)
    resetSearchForm()
    formik.handleSubmit()
  }
  const handleMoreResultsPress = async () => {
    formik.handleSubmit()
  }
  const resetSearchForm = () => {
    setJobData([])
    setLastVisibleDocument(null)
  }

  //variables
  const jobDataHasLength = jobData.length > 0
  const jobCards = jobDataHasLength
    ? jobData.map((client: JobWithIdT) => {
        return <JobListItem {...client} key={client.id} />
      })
    : null
  const allDataReturned = docCount === jobData.length

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View style={styles.searchTitleContainer}>
            <Image
              source={require('../../../../assets/search.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.searchTitle}>Search Jobs</Text>
          </View>

          <Dropdown
            formik={formik}
            name="searchField"
            placeholder="Search By"
            title="Search By"
            options={[
              { label: 'Job Name', value: '_searchJobName' },
              { label: 'Contact Name', value: '_searchContactName' },
              { label: 'Frequency', value: '_searchFrequency' },
              { label: 'Job Type', value: '_searchJobType' },
              { label: 'Town', value: '_searchTown' },
              { label: 'Address', value: '_searchAddress' },
            ]}
            imageName={'notes'}
          />
          <InputField
            formik={formik}
            name="searchTerm"
            placeholder="Seach Term"
            title="Search Term"
            imageName={'search'}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSearchAllJobsPress}
              text="Find All Jobs"
              isLoading={searchApiIsLoading}
              backgroundColor={theme.colors.buttonSecondary}
            />
            <Button
              onPress={handleSearchPress}
              text="Search"
              isLoading={searchApiIsLoading}
            />
          </View>
        </View>
      </View>

      <View style={styles.largeWebCards}>
        {jobCards}

        {docCount === 0 ? <NoDataFound /> : null}

        {jobDataHasLength ? (
          <View style={styles.buttonContainer}>
            <Button
              onPress={resetSearchForm}
              text="Reset Search Form"
              isLoading={false}
              backgroundColor={theme.colors.buttonSecondary}
            />
            <Button
              onPress={handleMoreResultsPress}
              text={allDataReturned ? 'No More Results' : 'Next 10 Results'}
              isLoading={searchApiIsLoading}
              opacity={allDataReturned ? 0.75 : 1}
              disabled={allDataReturned}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.footer} />
    </View>
  )
}

export default JobList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxWidth: 600,
    minWidth: 300,
    width: '95%',
    height: '100%',
    backgroundColor: theme.colors.backgroundGrey,
  },
  searchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 30,
  },
  searchTitle: {
    color: theme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    paddingTop: 1,
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
  largeWebCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    zIndex: -10,
  },
  footer: {
    height: 40,
    width: '100%',
    minWidth: 300,
  },
})

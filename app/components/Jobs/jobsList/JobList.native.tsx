import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import InputField from '../../../ui/formElements/InputField'
import Dropdown from '../../../ui/formElements/DropDown'
import JobListItem from './components/JobListItem'
import Button from '../../../ui/button/Button'
import theme from '../../../utils/theme/theme'
import useFormikSearch from './hooks/useFormikSearch'
import { JobWithIdT } from '../../../types/JobT'
import NoDataFound from './components/NoDataFound'
import useResetSearchOnFocus from '../../../utils/hooks/useResetSearchOnFocus'

const JobList = () => {
  //state
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false)

  //hooks
  useResetSearchOnFocus(() => {
    setJobData([])
    setLastVisibleDocument(null)
  })
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
    setSearchIsActive(true)
  }
  const handleSearchPress = async () => {
    formik.setFieldValue('findAll', false)
    resetSearchForm()
    formik.handleSubmit()
    setSearchIsActive(true)
  }
  const handleMoreResultsPress = async () => {
    formik.handleSubmit()
  }
  const resetSearchForm = () => {
    setJobData([])
    setLastVisibleDocument(null)
    setSearchIsActive(false)
  }

  //variables
  const jobDataHasLength = jobData.length > 0
  const jobCards = jobDataHasLength
    ? jobData.map((client: JobWithIdT) => {
        return <JobListItem {...client} key={client.id} />
      })
    : null
  const allDataReturned = docCount === jobData.length
  const deviceHeight = searchIsActive ? 350 : Dimensions.get('window').height

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { height: deviceHeight }]}>
        <Image
          source={require('../../../../assets/jobs.jpg')}
          style={{ width: '100%', height: deviceHeight, marginBottom: 8 }}
        />

        <View style={styles.searchContainer}>
          <View style={styles.searchTitleContainer}>
            <Image
              source={require('../../../../assets/search_white.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.searchTitle}>
              Search{' '}
              <Text
                style={[styles.searchTitle, { color: theme.colors.secondary }]}
              >
                Jobs
              </Text>
            </Text>
          </View>

          <View style={styles.inputContainer}>
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
              placeholder="Search Term"
              title="Search Term"
              imageName={'search'}
            />
          </View>

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

      {searchIsActive ? (
        <View style={[styles.searchResultsContainer]}>
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

          <View style={styles.footer} />
        </View>
      ) : null}
    </View>
  )
}

export default JobList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -5 }],
  },
  searchTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
    marginTop: 30,
  },
  searchTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    maxWidth: 600,
    zIndex: 10,
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
  searchResultsContainer: {
    flex: 1,
    width: '95%',
    height: '100%',
    alignItems: 'center',
    zIndex: -10,
    paddingVertical: 20,
  },
  footer: {
    height: 60,
    width: '100%',
    minWidth: 300,
  },
})

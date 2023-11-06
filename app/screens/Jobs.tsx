import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Dashboard from '../components/dashboard/Dashboard'
import JobList from '../components/Jobs/jobsList/JobList'

const Jobs = () => {
  return (
    <>
      <Dashboard>
        <Text style={styles.pageTitle}>Jobs</Text>
        <JobList />
      </Dashboard>
    </>
  )
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    color: '#337bae',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337bae',
    width: '95%',
    maxHeight: 100,
  },
  numberContainer: {
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 30,
    height: '100%',
    backgroundColor: '#337bae',
  },
  number: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: '#337bae',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
})

export default Jobs

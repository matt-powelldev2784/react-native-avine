import { View, Text, Image, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../utils/theme/theme'
import { useAuth } from '../auth/AuthProvider'
import StatsItem from './compnents/StatsItem'
import Button from '../../ui/button/Button'
import { getJobStats } from '../../db/jobStats/getJobStats'
import { JobStatsArray } from '../../types/JobStatsT'
import useFormikJobStats from './hooks/useFormikJobStats'
import Dropdown from '../../ui/formElements/DropDown'
import { dateRangeOptions } from './utils/dateRangeOptions'
import useWindowWidth from '../../utils/hooks/useWindowWidth'
import { Loading } from '../../ui'

interface GetJobStatsT {
  startDate: string
  endDate: string
}

const BusinessStats = () => {
  const [dateRange, setDateRange] = useState<GetJobStatsT>({} as GetJobStatsT)
  const [jobStats, setJobStats] = useState<JobStatsArray>([])
  const [isLoading, setIsLoading] = useState(false)
  const { userInfo } = useAuth()
  const { formik } = useFormikJobStats({ setDateRange })
  const width = useWindowWidth()

  console.log('isLoading', isLoading)

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      setIsLoading(true)
      const getStats = async () => {
        const stats = await getJobStats(dateRange)
        setJobStats(stats)
      }
      setIsLoading(false)
      getStats()
    }
  }, [dateRange])

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={require('../../../assets/graph.png')}
          style={{ width: 83, height: 74.5, marginBottom: 8 }}
        />

        <Text style={styles.primaryText}>
          {userInfo?.displayName ? `Hello, ${userInfo.displayName}!` : ''}
        </Text>

        <Text style={styles.secondaryText}>
          Select the date range and click get statistics to see the business and
          job statistics below.
        </Text>

        <View style={[styles.dropdownConatiner, { width: width }]}>
          <Dropdown
            formik={formik}
            name="dateRange"
            placeholder="Select Date Range"
            title=""
            options={dateRangeOptions}
            imageName={'diamond'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Get Statistics" onPress={() => formik.handleSubmit()} />
        </View>

        <View style={styles.instructionWrapper}>
          {isLoading ? <Loading loadingText="Loading statistics" /> : null}

          {jobStats
            ? jobStats.map((jobStat, i) => {
                const value = Object.values(jobStat)[0]
                const valueString = value.toString()
                const key = Object.keys(jobStat)[0]

                const colors = [
                  theme.colors.clientPrimary,
                  theme.colors.jobPrimary,
                  theme.colors.roundPrimary,
                  theme.colors.plannerPrimary,
                  theme.colors.invoicePrimary,
                ]

                return (
                  <StatsItem
                    key={key}
                    number={valueString}
                    text={key}
                    backgroundColor={colors[i]}
                  />
                )
              })
            : null}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    marginVertical: 36,
    paddingBottom: 80,
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 4,
  },
  dropdownConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
    maxWidth: 600,
    minWidth: 300,
    zIndex: 200,
    height: Platform.OS === 'web' ? 70 : 80,
    padding: 15,
  },
  buttonContainer: {
    zIndex: 199,
    transform: [{ translateY: -10 }],
  },
  instructions: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  instructionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
    marginBottom: 50,
    marginHorizontal: 16,
    maxWidth: 950,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
    marginTop: 16,
  },
  secondaryText: {
    fontSize: 18,
    color: theme.colors.primary,
    margin: 4,
    textAlign: 'center',
    marginHorizontal: 12,
    maxWidth: 800,
  },
  tertiaryText: {
    fontSize: 15,
    color: theme.colors.primary,
    textAlign: 'center',
    marginHorizontal: 8,
    maxWidth: 800,
    marginBottom: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    gap: 8,
    marginVertical: 16,
    marginTop: 16,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default BusinessStats

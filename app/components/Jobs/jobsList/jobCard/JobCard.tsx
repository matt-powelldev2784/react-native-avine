import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { JobWithIdT } from '../../../../../types/JobT'
import { useDeviceType } from '../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { deleteJobById } from '../../../../db/jobs/deleteJobById'

const JobCard = ({
  id,
  jobName,
  address,
  postcode,
  jobType,
  time,
  price,
  frequency,
}: JobWithIdT) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()
  const jobShortName = jobName
    .split(' ')
    .map((word): string => word[0])
    .join('')
    .substring(0, 3)

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <View style={styles.jobShortNameContainer}>
        <Text style={styles.jobShortNameText}>
          <Text style={styles.jobShortNameText}>
            {jobShortName.slice(0, 1).toUpperCase()}
          </Text>
          <Text style={styles.jobShortNameText}>
            {jobShortName.slice(1, 2).toUpperCase()}
          </Text>
          <Text style={styles.jobShortNameText}>
            {jobShortName.slice(2, 3).toUpperCase()}
          </Text>
        </Text>
      </View>
      <View style={styles.leftContainer}>
        <View style={styles.leftInfo}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {jobName}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {address}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {postcode}
          </Text>
        </View>

        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {jobType}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Time: {time} hrs
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Price: {price}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Freq: {frequency}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditJob', { jobId: id })
            }}
          >
            <Image
              source={require('../../../../../assets/pen.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              const deletedJob = await deleteJobById(id)
              if (deletedJob) {
                navigation.navigate('Jobs', { refresh: true })
              }
            }}
          >
            <Image
              source={require('../../../../../assets/bin.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337bae',
    height: 110,
    overflow: 'hidden',
    width: '100%',
  },
  cardLargeWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#337bae',
    height: 110,
    overflow: 'hidden',
    width: '100%',
  },
  jobShortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 25,
    padding: 4,
    height: '100%',
    backgroundColor: '#337bae',
  },
  jobShortNameText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    color: '#337bae',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

export default JobCard

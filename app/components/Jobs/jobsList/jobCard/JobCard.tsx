import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { JobWithIdT } from '../../../../../types/JobT'
import { useDeviceType } from '../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

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
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {jobName}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {address}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {postcode}
        </Text>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {jobType}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Time: {time}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Price: {price}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Freq: {frequency}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditJob', { jobId: id })
          }}
        >
          <Image
            source={require('../../../../../assets/edit.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
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
    height: 100,
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
    height: 100,
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
})

export default JobCard

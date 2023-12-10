import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RoundWithJobT } from '../../../../../../types/RoundT'
import theme from '../../../../../utils/theme/theme'
import { useDeviceType } from '../../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../../ui'

const RoundCard = ({
  id,
  roundName,
  location,
  frequency,
  jobs,
}: RoundWithJobT) => {
  const { isLargeWeb } = useDeviceType()
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const roundTime = jobs?.reduce((acc, job) => {
    return acc + Number(job.time)
  }, 0)
  const numOfJobs = jobs?.length
  const totalPrice = jobs?.reduce((acc, job) => {
    return acc + Number(job.price)
  }, 0)

  const roundShortName = roundName
    .split(' ')
    .map((word): string => word[0])
    .join('')
    .substring(0, 3)

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <View style={styles.jobShortNameContainer}>
        <Text style={styles.jobShortNameText}>
          {roundShortName.slice(0, 1).toUpperCase()}
        </Text>
        {roundShortName.length > 1 && (
          <Text style={styles.jobShortNameText}>
            {roundShortName.slice(1, 2).toUpperCase()}
          </Text>
        )}
        {roundShortName.length > 2 && (
          <Text style={styles.jobShortNameText}>
            {roundShortName.slice(1, 2).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={styles.leftContainer}>
        <View>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {roundName}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Location: {location}
          </Text>
        </View>

        <View>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Round Time: {roundTime} hrs
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Round Value: £{totalPrice}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.rightText}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Jobs: {numOfJobs}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {frequency}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('EditJob', { jobId: id })
            }}
          >
            <Image
              source={require('../../../../../../assets/plus_circle.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('EditJob', { jobId: id })
            }}
          >
            <Image
              source={require('../../../../../../assets/pen.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Image
              source={require('../../../../../../assets/bin.png')}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmModal
        modalText={`Are you sure you want to delete ${roundName}`}
        onConfirm={async () => {
          // const deletedJob = await deleteJobById(id)
          // if (deletedJob) {
          //   navigation.navigate('Jobs', { refresh: true })
          // }
        }}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      />
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
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
  },
  cardLargeWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 130,
    overflow: 'hidden',
    width: '100%',
  },
  jobShortNameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 28,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  jobShortNameText: {
    color: theme.colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 28,
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
  name: {
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})

export default RoundCard

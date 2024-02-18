import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { JobWithIdT } from '../../../../types/JobT'
import { useDeviceType } from '../../../../utils/deviceTypes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { ConfirmModal } from '../../../../ui'
import { deleteJobById } from '../../../../db/jobs/deleteJobById'
import theme from '../../../../utils/theme/theme'
import ShortNameText from '../../../../utils/shortNameText/ShortNameText'
import IconButton from '../../../../ui/iconButton/IconButton'

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
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { isLargeWeb } = useDeviceType()
  const handleEditJobPress = () => {
    navigation.navigate('EditJob', { jobId: id })
  }
  const handleDeleteJobPress = () => {
    setModalVisible(true)
  }
  const handleDeleteJob = async () => {
    const deletedJob = await deleteJobById(id)
    if (deletedJob) {
      navigation.navigate('Jobs', { refresh: true })
    }
  }

  return (
    <View style={isLargeWeb ? styles.cardLargeWeb : styles.cardSmallScreen}>
      <ShortNameText text={jobName} />

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
            Price: £{price}
          </Text>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {frequency}
          </Text>
        </View>

        <View style={styles.buttons}>
          <IconButton
            onPress={handleEditJobPress}
            imgSource={'pen.png'}
            size={35}
          />

          <IconButton
            onPress={handleDeleteJobPress}
            imgSource={'bin.png'}
            size={35}
          />
        </View>
      </View>

      <ConfirmModal
        modalText={`Are you sure you want to delete ${jobName}`}
        onConfirm={handleDeleteJob}
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

export default JobCard

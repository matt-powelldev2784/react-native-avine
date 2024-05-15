import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import { format } from 'date-fns'
import { convertDbDateToDateString } from '../../../../utils/convertDbDateToDateString'
import IconButton from '../../../../ui/iconButton/IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'

const InvoiceListItem = ({ id, completedDate, job }: InvoiceWithIdT) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const completedDateString = convertDbDateToDateString(completedDate)
  const formattedDate = format(completedDateString, 'dd MMMM yyyy')

  const handleEditInvoicePress = () => {
    navigation.navigate('InvoiceCardView', { invoiceId: id })
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.cardLeftBorder}></View>

        <View style={styles.leftContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {job.jobName}
          </Text>

          <Text style={styles.text}>{formattedDate}</Text>
        </View>

        <View style={styles.rightContainer}>
          <IconButton
            onPress={handleEditInvoicePress}
            imgSource={require('../../../../../assets/edit.png')}
            size={35}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    height: 70,
    overflow: 'hidden',
    width: '100%',
  },
  cardLeftBorder: {
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    width: 28,
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  leftContainer: {
    marginLeft: 28,
    padding: 8,
    justifyContent: 'center',
  },
  rightContainer: {
    marginLeft: 28,
    padding: 8,
    justifyContent: 'center',
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
})

export default InvoiceListItem

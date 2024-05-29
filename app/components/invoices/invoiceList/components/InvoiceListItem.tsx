import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../../../../utils/theme/theme'
import IconButton from '../../../../ui/iconButton/IconButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../screens/stackNavigator/StackNavigator'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import { convertPlannerDateToShortDate } from '../../../../utils/convertPlannerDateToShortDate'

const InvoiceListItem = ({ id, completedDate, price, job }: InvoiceWithIdT) => {
  //hooks
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleEditInvoicePress = () => {
    navigation.navigate('EditInvoice', { invoiceId: id })
  }
  const handleViewInvoicePress = () => {
    navigation.navigate('InvoiceCardView', { invoiceId: id })
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.container}>
        <View style={styles.cardLeftBorder}></View>

        <View style={[styles.leftContainer]}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {job.jobName}
          </Text>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Job Completed: {convertPlannerDateToShortDate(completedDate)}
          </Text>

          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            Price: £{price}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <IconButton
            onPress={handleViewInvoicePress}
            imgSource={require('../../../../../assets/eye.png')}
            size={35}
          />
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    height: 80,
    overflow: 'hidden',
    maxWidth: 800,
    width: '100%',
    flex: 1,
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
    flex: 1,
    marginLeft: 28,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    gap: 12,
  },
  title: {
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  text: {
    fontSize: 15,
    color: 'black',
    marginBottom: 0,
  },
})

export default InvoiceListItem

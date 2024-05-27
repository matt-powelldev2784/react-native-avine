import { View, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import theme from '../../../utils/theme/theme'
import { useDeviceType } from '../../../utils/deviceTypes'
import MenuCard from './components/MenuCard'

const JobsMenu = () => {
  const { isLargeWeb } = useDeviceType()
  const menuCardContainerMargin = isLargeWeb ? { marginTop: 50 } : null
  const deviceHeight = Dimensions.get('window').height - 95

  return (
    <View style={styles.container}>
      {/* -------------------- Header---------------------------- */}

      <View style={styles.headerContainer}>
        <Image
          source={require('../../../../assets/clients.jpg')}
          style={{ width: '100%', height: deviceHeight, marginBottom: 8 }}
        />
      </View>

      {/* -------------------- Menu Cards ---------------------------- */}
      <View style={[styles.menuCardContainer, menuCardContainerMargin]}>
        <MenuCard
          image={require('../../../../assets/plus.png')}
          text="Add Job"
          secondaryText="Click here to add a job. Following this you should add the job to a round which can be added to the planner."
          navigateTo="AddJob"
          backgroundColor={theme.colors.jobPrimary}
        />

        <MenuCard
          image={require('../../../../assets/search_white.png')}
          text="Search Jobs"
          secondaryText="Click here to search the job database and view existing job details."
          navigateTo="Jobs"
          backgroundColor={theme.colors.jobPrimary}
        />
      </View>

      <View style={styles.footer} />
    </View>
  )
}

export default JobsMenu

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerContainerSmall: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 40,
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 20,
    marginBottom: 50,
    width: '100%',
    maxWidth: 950,
    paddingHorizontal: 16,
  },
  footer: {
    height: 40,
    width: '100%',
    minWidth: 300,
  },
})

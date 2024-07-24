import React from 'react'
import { Dashboard, JobStats, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const jobStats = () => {
  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<JobStats key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Welcome'}
          bgColor={theme.colors.invoicePrimary}
          navigateTo="Home"
          buttonText="Job Statistics"
          icon={require('../../../assets/stars_white.png')}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.backgroundGrey,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default jobStats

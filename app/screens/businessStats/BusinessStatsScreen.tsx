import React from 'react'
import { Dashboard, BusinessStats, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const BusinessStatsScreen = () => {
  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<BusinessStats key={0} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Statistics'}
          bgColor={theme.colors.invoicePrimary}
          navigateTo="Home"
          buttonText="Quick Start"
          icon={require('../../../assets/right_arrow_white.png')}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.white,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default BusinessStatsScreen

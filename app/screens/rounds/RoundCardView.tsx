import React from 'react'
import { Dashboard, RoundCard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'

type RoundCardRouteProp = RouteProp<RootStackParamList, 'RoundCardView'>

const RoundCardView = () => {
  const route = useRoute<RoundCardRouteProp>()
  const jobId = route?.params?.roundId ? route?.params?.roundId : ''

  // flatlist is used to render children to allow the
  // dashboard header to be sticky in the webview
  const childrenArray = [<RoundCard key={jobId} roundId={jobId} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Round Details'}
          bgColor={theme.colors.invoicePrimary}
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

export default RoundCardView

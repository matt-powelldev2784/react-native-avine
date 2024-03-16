import React from 'react'
import { ScreenMenu, WeekPlanner } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const PlannerView = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<WeekPlanner key={1} />]

  return (
    <>
      <ScreenMenu
        title={'Planner'}
        navigateTo={'Planner'}
        navigateToProp={{ screen: 'ScheduleRoundFormView' }}
        buttonText="Schedule Round"
        bgColor={theme.colors.plannerPrimary}
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
    </>
  )
}

export default PlannerView

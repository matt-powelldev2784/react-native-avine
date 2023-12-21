import React from 'react'
import { Dashboard, ScreenMenu, WeekPlanner } from '../../components'
import theme from '../../utils/theme/theme'
import { Text } from 'react-native'

const Planner = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Planner'}
          // navigateTo={'AddRound'}
          // buttonText="Add Payment"
          bgColor={theme.colors.plannerPrimary}
        />
        <WeekPlanner />
        <Text>Add Round ToPlanner</Text>
      </Dashboard>
    </>
  )
}

export default Planner

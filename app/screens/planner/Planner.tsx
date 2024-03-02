import React, { useState } from 'react'
import {
  Dashboard,
  ScheduleRoundForm,
  ScreenMenu,
  WeekPlanner,
} from '../../components'
import theme from '../../utils/theme/theme'
import { PlannerContext } from './plannerContext/usePlannerContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'

type PlannerRouteProp = RouteProp<RootStackParamList, 'Planner'>

const Planner = () => {
  const route = useRoute<PlannerRouteProp>()
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const displayScheduledRoundForm = route.params?.displayScheduledRoundForm

  const PlannerContextValue = {
    displayWeek,
    setDisplayWeek,
    selectedDay,
    setSelectedDay,
  }

  return (
    <>
      <Dashboard>
        <PlannerContext.Provider value={PlannerContextValue}>
          {displayScheduledRoundForm ? null : (
            <ScreenMenu
              title={'Planner'}
              navigateTo={'Planner'}
              navigateToProp={{ displayScheduledRoundForm: true }}
              buttonText="Schedule Round"
              bgColor={theme.colors.plannerPrimary}
            />
          )}
          {displayScheduledRoundForm ? <ScheduleRoundForm /> : <WeekPlanner />}
        </PlannerContext.Provider>
      </Dashboard>
    </>
  )
}

export default Planner

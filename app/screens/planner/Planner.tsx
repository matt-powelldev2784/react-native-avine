import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../components'
import { PlannerContext } from './plannerContext/usePlannerContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'
import { SelectedJobT } from '../../types/JobT'
import {
  PlannerView,
  ExtendedPlannerView,
  ScheduleRoundFormView,
  ScheduledJobView,
} from '../index'
import { SelectedRoundInfoT } from '../../types/RoundT'

type PlannerRouteProp = RouteProp<RootStackParamList, 'Planner'>

const Planner = () => {
  const route = useRoute<PlannerRouteProp>()
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedJob, setSelectedJob] = useState<SelectedJobT | null>(null)
  const [selectedRound, setSelectedRound] = useState<SelectedRoundInfoT | null>(
    null,
  )
  const [daysToView, setDaysToView] = useState(7)
  const [plannerCardNeedsUpdate, setPlannerCardNeedsUpdate] = useState(false)
  const [plannerNeedsUpdate, setPlannerNeedsUpdate] = useState(false)
  const screen = route.params?.screen

  useEffect(() => {
    setSelectedDay(new Date())
    setDisplayWeek(new Date())
  }, [route.params?.refresh])

  const PlannerContextValue = {
    displayWeek,
    setDisplayWeek,
    selectedDay,
    setSelectedDay,
    selectedJob,
    setSelectedJob,
    selectedRound,
    setSelectedRound,
    daysToView,
    setDaysToView,
    plannerCardNeedsUpdate,
    setPlannerCardNeedsUpdate,
    plannerNeedsUpdate,
    setPlannerNeedsUpdate,
  }

  return (
    <>
      <Dashboard>
        <PlannerContext.Provider value={PlannerContextValue}>
          {screen === 'PlannerView' ? <PlannerView /> : null}
          {screen === 'MonthPlannerView' ? <ExtendedPlannerView /> : null}
          {screen === 'ScheduleRoundFormView' ? (
            <ScheduleRoundFormView />
          ) : null}
          {screen === 'ScheduledJobView' ? <ScheduledJobView /> : null}
        </PlannerContext.Provider>
      </Dashboard>
    </>
  )
}

export default Planner

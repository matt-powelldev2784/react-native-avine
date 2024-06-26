import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../components'
import { PlannerContext } from './plannerContext/usePlannerContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../stackNavigator/StackNavigator'
import PlannerView from './PlannerView'
import ScheduledJobView from './ScheduledJobView'
import { SelectedJobT } from '../../types/JobT'
import ScheduleRoundFormView from './ScheduleRoundFormView'

type PlannerRouteProp = RouteProp<RootStackParamList, 'Planner'>

const Planner = () => {
  const route = useRoute<PlannerRouteProp>()
  const [displayWeek, setDisplayWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [selectedJob, setSelectedJob] = useState<SelectedJobT | null>(null)
  const [plannerCardNeedsUpdate, setPlannerCardNeedsUpdate] = useState(false)
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
    plannerCardNeedsUpdate,
    setPlannerCardNeedsUpdate,
  }

  return (
    <>
      <Dashboard>
        <PlannerContext.Provider value={PlannerContextValue}>
          {screen === 'PlannerView' ? <PlannerView /> : null}
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

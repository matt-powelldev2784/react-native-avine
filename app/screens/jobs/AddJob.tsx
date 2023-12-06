import React from 'react'
import { AddJobForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const AddJob = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Add Job'} bgColor={theme.colors.jobPrimary} />
      <AddJobForm />
    </Dashboard>
  )
}

export default AddJob

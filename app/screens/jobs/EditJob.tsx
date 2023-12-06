import React from 'react'
import { Dashboard, EditJobForm } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const AddJob = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Edit Job'} bgColor={theme.colors.jobPrimary} />
      <EditJobForm />
    </Dashboard>
  )
}

export default AddJob

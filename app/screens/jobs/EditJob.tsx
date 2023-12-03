import React from 'react'
import { Dashboard, EditJobForm } from '../../components'
import { ScreenMenu } from '../../components'

const AddJob = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Edit Job'} />
      <EditJobForm />
    </Dashboard>
  )
}

export default AddJob

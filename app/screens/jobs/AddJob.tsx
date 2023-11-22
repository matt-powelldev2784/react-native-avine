import React from 'react'
import { AddJobForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'

const AddJob = () => {
  return (
    <Dashboard>
      <ScreenMenu title={'Add Job'} />
      <AddJobForm />
    </Dashboard>
  )
}

export default AddJob

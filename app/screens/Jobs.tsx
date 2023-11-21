import React from 'react'
import { Dashboard, JobList, ScreenMenu } from '../components'

const Jobs = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Jobs'} />
        <JobList />
      </Dashboard>
    </>
  )
}

export default Jobs

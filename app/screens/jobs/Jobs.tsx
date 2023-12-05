import React from 'react'
import { Dashboard, JobList, ScreenMenu } from '../../components'

const Jobs = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Job List'}
          navigateTo={'AddJob'}
          buttonText="Add Job"
        />
        <JobList />
      </Dashboard>
    </>
  )
}

export default Jobs

import React from 'react'
import { Dashboard, JobList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Jobs = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Job List'}
          navigateTo={'AddJob'}
          buttonText="Add Job"
          bgColor={theme.colors.jobPrimary}
        />
        <JobList />
      </Dashboard>
    </>
  )
}

export default Jobs

import React from 'react'
import { Dashboard, JobList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Client = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Client List'}
          navigateTo={'AddClient'}
          buttonText="Add Client"
          bgColor={theme.colors.jobPrimary}
        />
        <JobList />
      </Dashboard>
    </>
  )
}

export default Client

import React from 'react'
import { Dashboard, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'

const Home = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Welcome'} bgColor={theme.colors.jobPrimary} />
      </Dashboard>
    </>
  )
}

export default Home

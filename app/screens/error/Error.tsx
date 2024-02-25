import React from 'react'
import { Dashboard, ServerError, ScreenMenu } from '../../components'

const Error = () => {
  return (
    <>
      <Dashboard>
        <ScreenMenu title={'Server Error'} bgColor={'red'} />
        <ServerError />
      </Dashboard>
    </>
  )
}

export default Error

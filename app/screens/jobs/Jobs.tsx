import React from 'react'
import { Dashboard, JobList, ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const Jobs = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<JobList key={1} />]

  return (
    <>
      <Dashboard>
        <ScreenMenu
          title={'Job List'}
          navigateTo={'AddJob'}
          buttonText="Add Job"
          bgColor={theme.colors.jobPrimary}
        />

        <FlatList
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.backgroundGrey,
          }}
          data={childrenArray}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(item, index) => `child-${index}`}
        />
      </Dashboard>
    </>
  )
}

export default Jobs

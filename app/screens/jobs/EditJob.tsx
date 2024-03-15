import React from 'react'
import { Dashboard, EditJobForm } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const AddJob = () => {
  // flatlist is used to render children to allow the
  // dashboatd header to be sticky in the webview
  const childrenArray = [<EditJobForm key={1} />]

  return (
    <Dashboard>
      <ScreenMenu title={'Edit Job'} bgColor={theme.colors.jobPrimary} />
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={childrenArray}
        renderItem={({ item }) => <View>{item}</View>}
        keyExtractor={(item, index) => `child-${index}`}
      />
    </Dashboard>
  )
}

export default AddJob

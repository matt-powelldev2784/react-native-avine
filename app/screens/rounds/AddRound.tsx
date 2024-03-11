import React from 'react'
import { AddRoundForm, Dashboard } from '../../components'
import { ScreenMenu } from '../../components'
import theme from '../../utils/theme/theme'
import { FlatList, View } from 'react-native'

const AddRound = () => {
  // flatlist is used to render the form as vitualized lists are used
  // by react-native-draggable-flatlist in the add round form
  // this is a workaround to fix potentional rendering issues

  const childrenArray = [<AddRoundForm key={1} />]

  return (
    <Dashboard>
      <ScreenMenu title={'Add Round'} bgColor={theme.colors.roundPrimary} />
      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={childrenArray}
        renderItem={({ item }) => <View>{item}</View>}
        keyExtractor={(item, index) => `child-${index}`}
      />
    </Dashboard>
  )
}

export default AddRound

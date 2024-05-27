import { useFocusEffect } from '@react-navigation/native'
import React from 'react'

const useResetSearchOnFocus = (resetSearchForm: () => void) => {
  useFocusEffect(
    React.useCallback(() => {
      resetSearchForm()
    }, []),
  )
}

export default useResetSearchOnFocus

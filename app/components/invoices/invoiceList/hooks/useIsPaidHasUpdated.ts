import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useIsPaidHasUpdated = (
  addOrRemoveIsPaidInvoice: () => void,
  modalVisible: boolean,
) => {
  useEffect(() => {
    const getIsPaidHasUpdatedFromStorage = async () => {
      const isPaidHasUpdated = await AsyncStorage.getItem('isPaidHasUpdated')
      if (isPaidHasUpdated) {
        addOrRemoveIsPaidInvoice()
        AsyncStorage.removeItem('isPaidHasUpdated')
      }
    }
    getIsPaidHasUpdatedFromStorage()
  }, [modalVisible])
}

export default useIsPaidHasUpdated

import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import theme from '../../utils/theme/theme'
import * as Progress from 'react-native-progress'

interface ConfirmModalProps {
  visible: boolean
  onConfirm2?: () => void
  modalText: string
  modalText2?: string
  modalText3?: string
  isLoading?: boolean
}

const PleaseWaitModal = ({
  visible,
  modalText,
  modalText2,
  modalText3,
}: ConfirmModalProps) => {
  //variables
  const windowWidth = useWindowDimensions().width
  const smallModal = windowWidth < 412
  const modalWidth = smallModal ? 310 : 410

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { maxWidth: modalWidth }]}>
          {/********************************** Text ***********************************/}
          <Text style={styles.modalText}>{modalText}</Text>

          {modalText2 ? (
            <Text style={styles.modalText}>{modalText2}</Text>
          ) : null}

          {modalText3 ? (
            <Text style={styles.modalText}>{modalText3}</Text>
          ) : null}

          <Progress.Bar width={200} indeterminate={true} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    borderWidth: 8,
    borderStyle: 'solid',
    borderColor: '#337bae',
    paddingTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    maxWidth: 120,
    minWidth: 100,
  },
  buttonCancel: {
    backgroundColor: theme.colors.buttonSecondary,
  },
  buttonConfirm: {
    backgroundColor: '#337bae',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 8,
    borderRadius: 8,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default PleaseWaitModal

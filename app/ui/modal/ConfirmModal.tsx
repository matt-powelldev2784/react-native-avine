import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native'
import theme from '../../utils/theme/theme'

interface ConfirmModalProps {
  visible: boolean
  onConfirm: () => void
  onConfirm2?: () => void
  onCancel: () => void
  modalText: string
  modalText2?: string
  modalText3?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirmText2?: string
}

const ConfirmModal = ({
  visible,
  onConfirm,
  onConfirm2,
  onConfirmText2,
  onCancel,
  modalText,
  modalText2,
  modalText3,
  confirmButtonText,
  cancelButtonText,
}: ConfirmModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/********************************** Close Button ***********************************/}
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Image
              source={require('../../../assets/cross_white.png')}
              style={{ width: 12, height: 12 }}
            />
          </TouchableOpacity>

          {/********************************** Text ***********************************/}
          <Text style={styles.modalText}>{modalText}</Text>

          {modalText2 ? (
            <Text style={styles.modalText}>{modalText2}</Text>
          ) : null}

          {modalText3 ? (
            <Text style={styles.modalText}>{modalText3}</Text>
          ) : null}

          {/* If there is a second confirm button, show it, else show the cancel button */}
          <View style={styles.buttonContainer}>
            {onConfirm2 ? (
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={onConfirm2}
              >
                <Text style={styles.textStyle}>{onConfirmText2}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={onCancel}
              >
                <Text style={styles.textStyle}>
                  {cancelButtonText || 'Cancel'}
                </Text>
              </TouchableOpacity>
            )}

            {/********************************** Confirm Button ***********************************/}
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={onConfirm}
            >
              <Text style={styles.textStyle}>{confirmButtonText || 'OK'}</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 22,
    backgroundColor: Platform.OS === 'web' ? '' : 'rgba(0, 0, 0, 0.5)',
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
    maxWidth: 400,
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

export default ConfirmModal

import React from 'react'
import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'

interface CardModalProps {
  isVisible: boolean
  onCancel: () => void
  reactElement: React.ReactNode
}

const CardModal = ({ isVisible, onCancel, reactElement }: CardModalProps) => {
  const deviceHeight = Dimensions.get('window').height

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <ScrollView
        contentContainerStyle={[
          styles.centeredModal,
          { minHeight: deviceHeight },
        ]}
      >
        <TouchableOpacity onPress={onCancel} activeOpacity={1}>
          {reactElement}
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  elementContainer: { zIndex: 9999999 },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#337bae',
    padding: 8,
    borderRadius: 8,
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 9999999,
  },
})

export default CardModal

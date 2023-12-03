import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useDeviceType } from '../../../../utils/deviceTypes'

interface FormFlowTitlesProps {
  activeStep: number
}

const FormFlowTitles = ({ activeStep }: FormFlowTitlesProps) => {
  const { isSmallWeb, isNative } = useDeviceType()
  const isSmallDevice = isSmallWeb || isNative

  return (
    <View
      style={
        isSmallDevice ? styles.titleContainerSmallWeb : styles.titleContainer
      }
    >
      <Text style={activeStep === 0 ? styles.titleActive : styles.title}>
        {isSmallDevice
          ? ' Update\nLocation\nDetails'
          : ' Update Location Details'}
      </Text>

      <View style={isSmallDevice ? styles.lineSmallWeb : styles.line} />

      <Text style={activeStep === 1 ? styles.titleActive : styles.title}>
        {isSmallDevice ? 'Update\nContact\nDetails' : 'Update Contact Details'}
      </Text>

      <View style={isSmallDevice ? styles.lineSmallWeb : styles.line} />

      <Text style={[activeStep === 2 ? styles.titleActive : styles.title]}>
        {isSmallDevice ? 'Update\nJob\nDetails' : 'Update Job Details'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    marginTop: 16,
  },
  titleContainerSmallWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  titleActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#337bae',
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 88,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#337bae',
    backgroundColor: '#f1f2f2',
    borderRadius: 8,
    padding: 7,
    textAlign: 'center',
    minWidth: 88,
    overflow: 'hidden',
  },
  line: {
    width: 32,
    backgroundColor: '#337bae',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#337bae',
  },
  lineSmallWeb: {
    width: 24,
    backgroundColor: '#337bae',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#337bae',
  },
})

export default FormFlowTitles

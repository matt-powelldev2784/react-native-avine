import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { FormikProps } from 'formik'
import { View, Image, Platform, StyleSheet, Text } from 'react-native'
import { inputIcons } from './inputIcons'

interface DropdownProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  options: string[]
  imageName: keyof typeof inputIcons
}

const Dropdown = ({
  formik,
  name,
  placeholder,
  options,
  imageName,
}: DropdownProps) => {
  const handleChange = (selectedValue: string) => {
    formik.setFieldValue(name, selectedValue)
  }

  return (
    <View style={styles.container}>
      <Image source={inputIcons[imageName]} style={styles.image} />

      <Picker
        selectedValue={formik.values[name]}
        onValueChange={handleChange}
        style={[
          formik.touched[name] && formik.errors[name]
            ? styles.errorInput
            : styles.input,
        ]}
      >
        <Picker.Item label={placeholder} value="" />
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option}
            value={option}
            style={styles.input}
          />
        ))}
      </Picker>

      {formik.touched[name] && formik.errors[name] ? (
        <Text style={styles.errorText}>{String(formik.errors[name])}</Text>
      ) : (
        <Text style={styles.errorPlaceholder}>
          {String(formik.errors[name])}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    width: Platform.OS === 'web' ? 24 : 20,
    height: Platform.OS === 'web' ? 24 : 20,
    top: Platform.OS === 'web' ? 8 : 9.5,
    left: 10,
  },
  input: {
    height: 40,
    borderColor: '#337bae',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: Platform.OS === 'web' ? 40 : 36,
    backgroundColor: 'white',
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: Platform.OS === 'web' ? 40 : 36,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  errorPlaceholder: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
    opacity: 0,
    fontSize: 12,
  },
})

export default Dropdown

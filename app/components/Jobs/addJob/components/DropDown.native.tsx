import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FormikProps } from 'formik'
import { Dropdown as DropdownCustom } from 'react-native-element-dropdown'
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
  const items = options.map((option) => ({
    label: option,
    value: option,
  }))

  const handleChange = (item: any) => {
    if (item) {
      formik.setFieldValue(name, item.value)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={inputIcons[imageName]} style={styles.image} />

      <DropdownCustom
        data={items}
        labelField="label"
        valueField={formik.values[name] ? (null as any) : 'value'}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        onChange={handleChange}
        style={[
          formik.touched[name] && formik.errors[name]
            ? styles.errorInput
            : styles.input,
        ]}
      />

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
    zIndex: 1,
  },
  image: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 9.5,
    left: 10,
    zIndex: 10,
  },
  input: {
    borderColor: '#337bae',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
    zIndex: 0,
  },
  placeholder: {
    color: '#bfbfbf',
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
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

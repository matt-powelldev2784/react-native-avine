import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { FormikProps } from 'formik'
import { Dropdown as DropdownCustom } from 'react-native-element-dropdown'
import { inputIcons } from './inputIcons'
import theme from '../../utils/theme/theme'

interface DropdownProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  title: string
  options: { label: string; value: string | boolean }[]
  imageName: keyof typeof inputIcons
}

const Dropdown = ({
  formik,
  name,
  placeholder,
  title,
  options,
  imageName,
}: DropdownProps) => {
  const handleChange = (item: any) => {
    if (item) {
      formik.setFieldValue(name, item.value)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={inputIcons[imageName]} style={styles.image} />
      <Text style={styles.label}>{title.toUpperCase()}</Text>

      <DropdownCustom
        data={options}
        labelField={'label'}
        valueField={'value'}
        value={formik.values[name]}
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
    marginTop: 8,
    width: '100%',
  },
  label: {
    position: 'absolute',
    fontSize: Platform.OS === 'web' ? 16 : 16,
    marginBottom: 5,
    top: Platform.OS === 'web' ? -22 : -20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 9.5,
    left: 10,
    zIndex: 50,
  },
  input: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
    backgroundColor: 'white',
  },
  placeholder: {
    color: Platform.OS === 'web' ? '#828585' : '#bfbfbf',
  },
  errorInput: {
    height: 40,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 12,
  },
  errorPlaceholder: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0,
    fontSize: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
})

export default Dropdown

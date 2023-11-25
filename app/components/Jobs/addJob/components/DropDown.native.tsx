import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FormikProps } from 'formik'
import DropDownPicker from 'react-native-dropdown-picker'

interface DropdownProps {
  formik: FormikProps<any>
  name: string
  options: string[]
}

const Dropdown = ({ formik, name, options }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState(
    options.map((option) => ({ label: option, value: option })),
  )

  const handleChange = (selectedValue: string | null) => {
    if (value) {
      formik.setFieldValue(name, value)
    }
  }

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select an option..."
        onChangeValue={handleChange} // call handleChange when the value changes
      />
      {formik.touched[name] && formik.errors[name] ? (
        <Text style={styles.errorText}>{String(formik.errors[name])}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
})

export default Dropdown

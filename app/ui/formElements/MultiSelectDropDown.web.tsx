import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { FormikProps } from 'formik'
import Select from 'react-dropdown-select'
import { inputIcons } from './inputIcons'
import theme from '../../utils/theme/theme'

interface DropdownProps {
  formik: FormikProps<any>
  name: string
  placeholder: string
  title: string
  options: { label: string; value: string }[]
  imageName: keyof typeof inputIcons
  confirmUnqiueFiveDigitsPrefixAddedtoValue: boolean
}

type OptionsT = { label: string; value: string }

const MultiSelectDropdown = ({
  formik,
  name,
  placeholder,
  title,
  options,
  imageName,
  confirmUnqiueFiveDigitsPrefixAddedtoValue,
}: DropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<OptionsT[]>([])

  //set selected items to formik values if back button if used
  if (selectedItems.length === 0 && formik.values[name].length > 0) {
    options.filter((option) => {
      if (formik.values[name].includes(option.label)) {
        setSelectedItems((prev) => [...prev, option])
      }
    })
  }

  const handleChange = (selected: any) => {
    setSelectedItems(selected)
    if (selected) {
      formik.setFieldValue(
        name,
        selected.map((item: any) => item.label),
      )
    }
  }

  return (
    <View style={styles.container}>
      <Image source={inputIcons[imageName]} style={styles.image} />
      <Text style={styles.label}>{title.toUpperCase()}</Text>

      <View></View>
      <Select
        options={options}
        values={selectedItems}
        onChange={handleChange}
        multi
        placeholder={placeholder}
        color={theme.colors.primary}
        style={
          formik.touched[name] && formik.errors[name]
            ? styles.errorInput
            : styles.input
        }
        itemRenderer={({ item, methods }) => (
          <View
            key={item.label}
            style={
              formik.values[name].includes(item.label)
                ? styles.selectedRenderItem
                : styles.renderItem
            }
          >
            <Text
              onPress={() => {
                methods.addItem(item)
              }}
              style={
                formik.values[name].includes(item.label)
                  ? styles.selectedRenderItemText
                  : styles.renderItemText
              }
            >
              {confirmUnqiueFiveDigitsPrefixAddedtoValue
                ? item.value.substring(5)
                : item.value}
            </Text>
          </View>
        )}
        contentRenderer={() => {
          return (
            <View>
              <Text style={styles.placeholder}>Select Jobs To Add</Text>
            </View>
          )
        }}
      />

      <View style={styles.valuesPreview}>
        {selectedItems.map((item: OptionsT) => (
          <Text key={item.value} style={styles.valuePreview}>
            {item.value.substring(5)}
          </Text>
        ))}
      </View>

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
    fontSize: 16,
    marginBottom: 5,
    top: -22,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 8,
    left: 10,
    zIndex: 20,
  },
  input: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 36,
    zIndex: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 40,
  },
  placeholder: {
    color: Platform.OS === 'web' ? '#828585' : '#bfbfbf',
    fontSize: 16,
  },
  renderItem: {
    backgroundColor: 'white',
    height: 35,
    paddingLeft: 36,
    justifyContent: 'center',
  },
  selectedRenderItem: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    height: 35,
    paddingLeft: 36,
    justifyContent: 'center',
  },
  renderItemText: {
    fontSize: 16,
  },
  selectedRenderItemText: {
    color: 'white',
    fontSize: 16,
  },
  valuesPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valuePreview: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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

export default MultiSelectDropdown

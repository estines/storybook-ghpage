import React, { Component } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

class SelectInput extends Component {
  state = {
    visible: false
  }
  render () {
    const {
      label,
      value,
      options,
      onChange,
      editable,
      placeholder
    } = this.props
    let valueLabel =
      value && value !== null && value !== '' ? value : placeholder
    if (value && value !== null && value !== '') {
      const valueData = options.find(o => o.value === value)
      if (valueData && valueData.label) {
        valueLabel = valueData.label
      }
    }
    const borderWidth = editable === false ? 0 : 1

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.br} />
        {editable ? (
          <RNPickerSelect
            placeholder={{
              label: placeholder || '',
              value: null,
              color: '#9EA0A4'
            }}
            items={options}
            onValueChange={onChange}
            ref={ref => (this.picker = ref)}
            style={styles.pickerSelectStyles}
            value={value}
            useNativeAndroidPickerStyle
          >
            <View style={[styles.inputWrapper, { borderWidth }]}>
              <TextInput style={styles.input} value={valueLabel} />
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="#000"
              />
            </View>
          </RNPickerSelect>
        ) : (
          <View
            style={[
              styles.inputWrapper,
              { borderWidth, backgroundColor: '#FFF' }
            ]}
          >
            <TextInput
              style={styles.input}
              value={valueLabel}
              editable={false}
            />
          </View>
        )}
      </View>
    )
  }
}

SelectInput.defaultProps = {
  editable: true,
  options: []
}

SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

export default SelectInput

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    paddingHorizontal: 10
  },
  label: {
    color: '#7E7E7E'
  },
  br: {
    marginVertical: 5
  },
  input: {
    padding: 10,
    borderRadius: 5,
    flex: 1
  },
  wrapper: {
    width: '100%'
  }
})

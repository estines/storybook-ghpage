import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import format from 'date-fns/format'

export default class DatePicker extends Component {
  state = {
    isDateTimePickerVisible: false
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = date => {
    this._hideDateTimePicker()
    this.props.onChange(date)
  }

  render () {
    const { label, value, editable } = this.props
    const borderWidth = editable === false ? 0 : 1
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.br} />
        {editable ? (
          <TouchableOpacity
            style={[styles.inputWrapper, { borderWidth }]}
            onPress={this._showDateTimePicker}
          >
            <View style={styles.input} editable={false}>
              <Text style={styles.value}>
                {value && value !== null
                  ? format(value, 'DD/MM/YYYY')
                  : 'Select Date'}
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={18} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={[styles.inputWrapper, { borderWidth }]}>
            <View style={styles.input} editable={false}>
              <Text style={styles.value}>
                {value && value !== null
                  ? format(value, 'DD/MM/YYYY')
                  : 'Select Date'}
              </Text>
            </View>
          </View>
        )}
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    )
  }
}

DatePicker.defaultProps = {
  editable: true
}

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

import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { TextInputMask } from 'react-native-masked-text'

const renderInput = props => {
  const {
    label,
    textArea,
    editable,
    inputStyles,
    mask,
    maskFormat,
    maskType
  } = props
  const borderWidth = editable === false ? 0 : 1
  if (textArea) {
    return (
      <TextInput
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, inputStyles, { minHeight: 100, borderWidth }]}
        multiline
      />
    )
  } else if (mask) {
    return (
      <TextInputMask
        {...props}
        type={maskType}
        style={[styles.input, inputStyles, { borderWidth }]}
        autoCorrect={false}
        autoCapitalize="none"
        options={{
          format: maskFormat
        }}
      />
    )
  } else {
    return (
      <TextInput
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        style={[styles.input, inputStyles, { borderWidth }]}
      />
    )
  }
}
const Input = props => {
  const { label } = props
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.br} />
      {renderInput(props)}
    </View>
  )
}

Input.defaultProps = {
  editable: true,
  inputStyles: {}
}

Input.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  editable: PropTypes.bool,
  placeholder: PropTypes.string
}

export default Input

const styles = StyleSheet.create({
  label: {
    color: '#7E7E7E'
  },
  br: {
    marginVertical: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 10,
    borderRadius: 5
  },
  wrapper: {
    width: '100%'
  }
})

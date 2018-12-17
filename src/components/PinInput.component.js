import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

class AuthInput extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.focus !== nextProps.focus) {
      const { focus, name } = nextProps
      if (focus === name) {
        this.input.focus()
      }
    }
  }
  setRef = (ref) => {
    this.input = ref
  }
  render () {
    const { placeholder, value, onChangeText, focus, next, name } = this.props
    const isFocus = focus === name
    return (
      <View
        style={[
          styles.wrapper,
          (value && value.length > 0) || isFocus
            ? styles.validInput
            : styles.invalidInput
        ]}
      >
        <TextInput
          {...this.props}
          focus={isFocus}
          maxLength={1}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder={placeholder || ''}
          value={value}
          ref={this.setRef}

          onChangeText={val => {
            onChangeText(val)
            if (val && val !== null && val.length === 1) {
              this.input.blur()
              next()
            }
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  invalidInput: {},
  validInput: {
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10
  },
  input: {
    marginLeft: 10,
    fontSize: 20,
    flex: 1,
    textAlign: 'center'
  },
  wrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#FFF',
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10
  }
})
export default AuthInput

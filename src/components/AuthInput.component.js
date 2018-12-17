import React from 'react'
import { StyleSheet, View, TextInput, Image } from 'react-native'

import AVATAR from '../assets/icon/avatar.png'
import PASSWORD from '../assets/icon/password.png'
import MOBILE from '../assets/icon/mobile.png'

const renderIcon = icon => {
  if (icon === 'avatar') {
    return <Image source={AVATAR} />
  } else if (icon === 'password') {
    return <Image source={PASSWORD} />
  } else if (icon === 'mobile') {
    return <Image source={MOBILE} style={{ tintColor: '#CECECE' }} />
  }
}

const AuthInput = props => {
  const { placeholder, icon } = props
  return (
    <View style={styles.wrapper}>
      {renderIcon(icon)}
      <TextInput
        {...props}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder={placeholder || ''}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 30,
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10
  }
})
export default AuthInput

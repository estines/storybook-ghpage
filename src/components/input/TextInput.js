import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

import AVATAR from '../../assets/icon/avatar.png'
import PASSWORD from '../../assets/icon/password.png'
import MOBILE from '../../assets/icon/mobile.png'

const TextInput = ({ value, onChange, icon }) => (
  <InputWrapper>
    <InputIcon icon={icon} />
    <Input onChange={onChange} />
  </InputWrapper>
)

TextInput.defaultProps = {
  onChange: e => console.log(e.target.value),
  icon: ''
}

export const InputIcon = ({ icon }) => {
  let source = null
  switch (icon) {
    case 'avatar':
      source = AVATAR
      break
    case 'password':
      source = PASSWORD
      break
    case 'mobile':
      source = MOBILE
      break
    default:
      return null
  }

  return <Image source={source} />
}

export const Input = styled.TextInput`
    margin-left : 10px;
    font-size: 16px;
    flex: 1;
`

export const InputWrapper = styled.View`
    border-width: 1;
    border-color: #dbdbdb;
    background-color: #FFF;
    width: 100%;
    flex-direction: row;
    align-items: center;
    border-radius: 30;
    padding: 15px 30px;
    shadow-color: #dbdbdb;
    shadow-offset: { width: 0, height: 1 };
    shadow-opacity: 0.5;
    shadow-radius: 5;
    elevation: 1;
`

export default TextInput

import React from 'react'
import styled from 'styled-components/native'
import RNPicker from 'react-native-picker-select'
import { AntDesign } from '@expo/vector-icons'

export const RoundButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  background-color: #ff5959;
  border-radius: 27px;
  align-items:center;
  justify-content: center;
`

export const SelectWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`

export const SelectButton = ({ placeholder, items }) => (
  <SelectWrapper>
    <RNPicker
      placeholder={{ label: 'Select', value: null }}
      items={items}
      style={{
        viewContainer: {
          width: '25%',
          backgroundColor: '#ff5959',
          height: 26,
          borderRadius: 13,
          justifyContent: 'center'
        },
        inputIOS: {
          height: 26,
          color: '#fff'
        },
        inputAndroid: {
          height: 26,
          color: '#fff'
        },
        iconContainer: {
          right: 10
        }
      }}
      useNativeAndroidPickerStyle={false}
      textInputProps={{ underlineColorAndroid: 'cyan' }}
      Icon={() => {
        return <AntDesign name="down" size={24} color="black" />
      }}
    />
  </SelectWrapper>
)

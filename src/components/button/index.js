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

export const SelectButton = ({ value, items, onChange, width, height }) => (
  <SelectWrapper>
    <RNPicker
      placeholder={{ label: 'Select...' }}
      placeholderTextColor="#FFF"
      value={value}
      items={items}
      style={{
        viewContainer: {
          width: width || 100,
          backgroundColor: '#ff5959',
          height: height || 26,
          borderRadius: 13,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center'
        },
        inputIOSContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },
        inputIOS: {
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          height: 26,
          marginRight: 5
        },
        inputAndroid: {
          height: 26,
          color: '#fff'
        },
        iconContainer: {
          display: 'flex',
          position: 'relative',
          margin: 0
        }
      }}
      onValueChange={onChange}
      useNativeAndroidPickerStyle={false}
      textInputProps={{ underlineColorAndroid: 'cyan' }}
      Icon={() => {
        return <AntDesign name="down" size={10} color="#FFF" />
      }}
    />
  </SelectWrapper>
)

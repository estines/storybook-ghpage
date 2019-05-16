import React from 'react'
import { View, Modal, TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components/native'

export const Screen = styled.View`
  backgroundColor: ${props => props.color || '#f7f7f7'};
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'}
  width: 100%;
`

export const Column = styled.View`
  flex: ${props => props.flex || 1};
  padding-left: ${props => props.paddingLeft || 0};
  padding-right: ${props => props.paddingRight || 0};
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const Br = styled.View`
  margin-vertical: ${props => props.size || '5px'};
`

export const Card = styled.View`
  border-radius: 15px;
  box-shadow: 0 1px 5px gray;
  shadow-opacity: 0.3;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 20px;
  background-color: #FFF;
  margin-vertical: 5px;
  margin-horizontal: 5px;
  padding-bottom: 5px;
  width: ${props => props.width || 0};
  height: ${props => props.height || 0};
`

export const Box = styled.View`
  width: ${props => props.width || '150px'};
  height: ${props => props.height || '150px'};
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.05);
  align-items: center;
  justify-content: center;
  shadow-opacity: 1;
`

export const BlurBackground = styled.View`
  background-color: #666666;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Dialog = ({ isVisible, onCloseDialog, children }) => (
  <Modal visible={isVisible}>
    <BlurBackground>
      <Card width="90%" height="52%">
        <Row justify="flex-end">
          <Text onPress={onCloseDialog}>X</Text>
        </Row>
        {children}
      </Card>
    </BlurBackground>
  </Modal>
)

// export { default as Row } from './Row.layout'
// export { default as Column } from './Column.layout'
// export { default as Br } from './Br.layout'

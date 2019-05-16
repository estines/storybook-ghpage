import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const CounterButton = ({ value, large, onPress }) => {
  const hasValue = value && value > 0
  const tintColor = large ? '#000' : '#ff5959'
  const plusIconColor = hasValue ? (large ? '#FFF' : '#ff5959') : '#ff5959'
  const plusBgcolor = hasValue ? '#E8615F' : '#FFF'

  return (
    <ButtonWrapper large={large} hasValue={hasValue}>
      <Button left={true} large={large} onPress={() => onPress('DECREASE')}>
        <AntDesign name='minus' size={large ? 20 : 15} color={tintColor} />
      </Button>
      <Text>{value || 0}</Text>
      <Button right={true} large={large} hasValue={hasValue} onPress={() => onPress('INCREASE')} style={large ? { backgroundColor: plusBgcolor } : {}}>
        <AntDesign name='plus' size={large ? 20 : 15} color={plusIconColor} />
      </Button>
    </ButtonWrapper>
  )
}

export const ButtonWrapper = styled.View`
    border-radius: ${props => props.large ? '40px' : '15px'};
    border-right-width: 0px;
    border-left-width: 0px;
    flex-direction: row;
    background-color: ${props => props.large ? '#f1efef' : 'transparent'};
    width: ${props => props.large ? '40%' : '25%'};
    height: ${props => props.large ? '40px' : '25px'};
    justify-content: space-between;
    align-items: center;
`
// border-width: 0.8px;
// border-color: ${props => props.hasValue ? '#E8615F' : '#E3E3E3'};

export const Button = styled.TouchableOpacity`
    width: ${props => props.large ? '30px' : '22px'};
    height: ${props => props.large ? '30px' : '22px'};
    border-radius: ${props => props.large ? '20px' : '5px'};
    margin-vertical: ${props => props.large ? '-2px' : '-1.5px'};
    margin-left: ${props => props.left ? '10px' : '0'};
    margin-right: ${props => props.right ? '10px' : '0'};
    border-color: ${props => props.large ? '#E8615F' : 'transparent'};
    background-color: ${props => props.large ? '#FFF' : '#f7f7f7'};
    justify-content: center;
    align-items: center;
`
// border - width: 1px;

export default CounterButton

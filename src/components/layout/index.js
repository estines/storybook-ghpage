import styled from 'styled-components/native'

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
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
`

// export { default as Row } from './Row.layout'
// export { default as Column } from './Column.layout'
// export { default as Br } from './Br.layout'

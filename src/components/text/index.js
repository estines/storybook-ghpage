import styled from 'styled-components/native'

export const Title = styled.Text`
    color: #E45655;
    font-size: 30px;
    fontWeight: bold;
    margin-top: 10px;
`
export const Span = styled.Text`
    font-family: OpenSans;
    color: #d0d0d0;
    font-size: 14px;
`

export const Link = styled.Text`
    font-family: OpenSans;
    font-size: 20px;
    font-weight: ${props => props.bold ? 600 : 500};
    color: #E45655;
    margin-vertical: 10px;
`

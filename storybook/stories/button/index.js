import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Text } from 'react-native'

import { RoundButton, SelectButton } from '../../../src/components/button'

storiesOf('Button', module)
  .add('RoundButton', () => (
    <CenteredView>
      <RoundButton>
        <Text>Round Button</Text>
      </RoundButton>
    </CenteredView>
  ))
  .add('SelectButton', () => (
    <SelectButtonComponent />
  ))

class SelectButtonComponent extends React.Component {
  state = {
    value: '1'
  }

  menuList = [
    { label: 'Eat In', value: '1' },
    { label: 'Take Away', value: '2' },
    { label: 'Delivery', value: '3' }
  ]

  onSelectMenu = value => {
    this.setState({ value })
  }

  render () {
    return (
      <CenteredView>
        <SelectButton value={this.state.value} items={this.menuList} onChange={this.onSelectMenu} />
      </CenteredView>
    )
  }
}

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
}

const CenteredView = ({ children }) => (
  <View style={styles.view}>
    {children}
  </View>
)

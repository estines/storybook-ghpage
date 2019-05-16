import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Text } from 'react-native'

import TextInput from '../../../src/components/input/TextInput'
import CounterInput from '../../../src/components/input/CounterInput'

storiesOf('Input', module)
  .add('TextInput', () => (
    <CenteredView>
      <Text style={styles.text}>Without Icon</Text>
      <TextInput />
      <Text style={styles.text}>With Icons</Text>
      <TextInput icon="avatar" />
    </CenteredView>
  ))
  .add('CounterInput', () => (
    <CounterInputScreen />
  ))

class CounterInputScreen extends React.Component {
  state = {
    value: 0
  }

  onPress = type => {
    switch (type) {
      case 'INCREASE':
        return this.setState({
          value: this.state.value + 1
        })
      case 'DECREASE':
        if (this.state.value > 0) {
          return this.setState({
            value: this.state.value - 1
          })
        }
        break
      default:
        break
    }
  }

  render () {
    return (
      <CenteredView>
        <Text style={styles.text}>Simple size</Text>
        <CounterInput value={this.state.value} onPress={this.onPress} />
        <Text style={styles.text}>Large size</Text>
        <CounterInput large={true} value={this.state.value} onPress={this.onPress} />
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
  },
  text: {
    marginVertical: 15
  }
}

const CenteredView = ({ children }) => (
  <View style={styles.view}>
    {children}
  </View>
)

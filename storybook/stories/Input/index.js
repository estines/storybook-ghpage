import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Text } from 'react-native'

import TextInput from '../../../src/components/input/TextInput'

storiesOf('Input', module)
  .add('TextInput', () => (
    <CenteredView>
      <Text style={styles.text}>Without Icon</Text>
      <TextInput />
      <Text style={styles.text}>With Icons</Text>
      <TextInput icon="avatar" />
    </CenteredView>
  ))

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

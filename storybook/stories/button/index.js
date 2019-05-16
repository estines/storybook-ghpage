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
    <CenteredView>
      <SelectButton items={mockData} />
    </CenteredView>
  ))

const mockData = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 }
]

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

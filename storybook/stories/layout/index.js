import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Text } from 'react-native'

import { Column, Row, Br, Card } from '../../../src/components/layout'

storiesOf('Layout', module)
  .add('Column', () => (
    <CenteredView>
      <Column style={{ backgroundColor: '#FFF' }}>
        <Text>Column Area</Text>
      </Column>
    </CenteredView>
  ))
  .add('Row', () => (
    <CenteredView>
      <Row style={{ backgroundColor: '#FFF' }} />
    </CenteredView>
  ))
  .add('Br', () => (
    <CenteredView>
      <Br style={{ backgroundColor: '#FFF' }} />
    </CenteredView>
  ))
  .add('Card', () => (
    <CenteredView>
      <Card>
        <Text>This is a Card</Text>
      </Card>
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

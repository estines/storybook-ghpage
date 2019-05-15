import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import { Title, Span, Link } from '../../../src/components/text'

storiesOf('Text', module)
  .add('Title', () => (
    <CenteredView>
      <Title>Title</Title>
    </CenteredView>
  ))
  .add('Span', () => (
    <CenteredView>
      <Span>Span</Span>
    </CenteredView>
  ))
  .add('Link', () => (
    <CenteredView>
      <Link>Link</Link>
    </CenteredView>)
  )

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

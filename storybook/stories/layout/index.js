import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, TouchableOpacity, Text } from 'react-native'

import { Column, Row, Br, Card, Box, Dialog } from '../../../src/components/layout'

storiesOf('Layout', module)
  .add('Column', () => (
    <Column>
      <Text>Column1 Area</Text>
      <Text>Column2 Area</Text>
    </Column>
  ))
  .add('Row', () => (
    <CenteredView>
      <Row style={{ backgroundColor: '#FFF' }}>
        <Text>Row 1</Text>
      </Row>
      <Row style={{ backgroundColor: '#FFF' }}>
        <Text>Row 2</Text>
      </Row>
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
  .add('Box', () => (
    <CenteredView>
      <Box>
        <Text>Box</Text>
      </Box>
    </CenteredView>
  ))
  .add('Dialog', () => (
    <DialogScreen />
  ))

class DialogScreen extends React.Component {
  state = {
    isVisible: false
  }

  onOpenDialog = () => {
    this.setState({ isVisible: true })
  }

  onCloseDialog = () => {
    this.setState({ isVisible: false })
  }

  render () {
    return (
      <CenteredView>
        <TouchableOpacity onPress={this.onOpenDialog}>
          <Text>Press to open Dialog</Text>
        </TouchableOpacity>
        <Dialog isVisible={this.state.isVisible} onCloseDialog={this.onCloseDialog}>
          <Text>Hello inside Dialog</Text>
        </Dialog>
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

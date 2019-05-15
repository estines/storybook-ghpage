import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// components
import Header from '../Header.component'

// assets
import LOGOUT from '../../assets/icon/logout.png'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

export default class Drawer extends Component {
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.visible === true &&
      nextProps.visible !== this.props.visible
    ) {
      this.refs.view.slideInLeft(300)
    }
  }
  render () {
    const { visible, close } = this.props
    return (
      <Modal animationType="fade" visible={visible} transparent>
        <Animatable.View ref="view" style={styles.screen}>
          <Header
            left="close"
            containerStyle={styles.header}
            onPressLeft={close}
          />
          <View style={styles.top}>
            <Image source={{ uri: ED_SHEERAN }} style={styles.avatar} />
            <Text style={styles.name}>Shawn Mentos</Text>
            <Text style={styles.email}>Shawneat@gmail.com</Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity style={styles.menu}>
              <Image source={LOGOUT} />
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <View style={styles.backdrop} />
      </Modal>
    )
  }
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3

const cardWidth = WIDTH / 2 - 30
const styles = StyleSheet.create({
  menuText: {
    flex: 1,
    paddingLeft: 20
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10%',
    borderBottomWidth: 0.5,
    borderColor: '#CDCDCD',
    paddingVertical: 15
  },
  email: {
    color: '#7E7E7E',
    fontSize: 12
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 100
  },
  content: {
    flex: 1
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: HEIGHT / 3
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    borderColor: '#FFF',
    borderWidth: avatarSize / 20,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent'
  },
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    width: WIDTH * 0.6,
    height: '100%',
    backgroundColor: '#FFF',
    zIndex: 1000,
    position: 'relative',
    overflow: 'hidden'
  }
})

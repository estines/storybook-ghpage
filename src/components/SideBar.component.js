import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

// components
import Header from './Header.component'

// assets
import LOGOUT from '../assets/icon/logout.png'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

export default props => {
  return (
    <View style={styles.screen}>
      <Header left="close" containerStyle={styles.header} />
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
    </View>
  )
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

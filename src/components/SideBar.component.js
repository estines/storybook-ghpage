import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'

// components
import Header from './Header.component'

// assets
import LOGOUT from '../assets/icon/logout.png'
import AVATAR from '../assets/img/boy.png'

const logout = async props => {
  try {
    props.navigation.closeDrawer()
    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('userId')
    props.navigation.navigate('Auth', { screen: 'Auth' })
  } catch (error) {
    console.log(error, 'error...')
  }
}

const SideBar = props => {
  const { name, image, email } = props
  let avatar = AVATAR
  if (image && image !== null) {
    avatar = {
      uri: `https://orderking.s3.amazonaws.com/images/thumbnail/${image}`
    }
  }

  return (
    <View style={styles.screen}>
      <Header
        left="close"
        containerStyle={styles.header}
        onPressLeft={() => props.navigation.closeDrawer()}
      />
      <View style={styles.top}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.menu} onPress={() => logout(props)}>
          <Image source={LOGOUT} />
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapState = state => state.profile

export default connect(mapState)(SideBar)

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3

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

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions
} from 'react-native'
import { MapView, LinearGradient, Permissions, Location } from 'expo'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { connect } from 'react-redux'

import { fetchProfile } from '../../store/actions'
// assets
import PHONE from '../../assets/icon/phone.png'
import MAIL from '../../assets/icon/mail.png'
import FACEBOOK from '../../assets/icon/facebook.png'
import PLACE from '../../assets/icon/place-red.png'
import CURRENT_POSITION from '../../assets/icon/current-position.png'
import AVATAR from '../../assets/img/boy.png'
// config
import { mapStyle } from '../../config'

const { PROVIDER_GOOGLE, Marker } = MapView

const ListItem = props => {
  const { icon, title, subTitle } = props
  return (
    <View style={listStyles.wrapper}>
      <Image style={listStyles.icon} source={icon} />
      <View style={listStyles.center}>
        <Text style={listStyles.title}>{title}</Text>
        <Text style={listStyles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  )
}

const listStyles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  title: {
    marginBottom: 5
  },
  subTitle: {
    color: '#7E7E7E',
    fontSize: 10
  },
  center: {
    flex: 1,
    paddingLeft: 20
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '5%'
  }
})

const AppHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <Header
        leftComponent={{
          icon: 'close',
          color: '#000000',
          size: 25,
          onPress: props.onPressLeft
        }}
        rightComponent={{
          text: 'Edit',
          style: { color: '#007AFF', fontSize: 18 },
          onPress: props.onPressRight
        }}
        containerStyle={{
          backgroundColor: '#FFF',
          justifyContent: 'space-around',
          borderBottomWidth: 0,
          paddingTop: ifIphoneX ? 0 : 10,
          height: 50
        }}
      />
    </SafeAreaView>
  )
}

class ProfileScreen extends Component {
  state = {
    phoneNumber: '+123 456 789 234',
    email: 'Shawneat@mail.com',
    facebook: 'Shawn Mentos Facebook',
    address: '497 Sukhumvit road, Silom',
    location: null
  }

  componentDidMount () {
    this.getLocationAsync()
    this.props.fetchProfile()
  }

  getLocationAsync = async () => {
    try {
      console.log('get location....')
      await Permissions.askAsync(Permissions.LOCATION)
      let location = await Location.getCurrentPositionAsync({})
      console.log(location, 'location....')
      if (location && location.coords) {
        this.setState({
          location: {
            ...location.coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        })
      }
    } catch (error) {
      console.log(error, 'error geet location')
    }
  }

  back = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  edit = () => {
    this.props.navigation.navigate('EditProfile')
  }

  render () {
    const {
      phoneNumber,
      email,
      facebook,
      address,
      location,
      name,
      image
    } = this.props
    let avatar = AVATAR
    if (image && image !== null) {
      avatar = {
        uri: `https://orderking.s3.amazonaws.com/images/thumbnail/${image}`
      }
    }
    return (
      <View style={styles.screen}>
        <AppHeader onPressLeft={this.back} onPressRight={this.edit} />
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Profile</Text>
        </View>
        <View style={styles.top} />
        {location && location !== null ? (
          <MapView
            style={styles.mapView}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            region={location}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            customMapStyle={mapStyle}
          >
            <Marker coordinate={location}>
              <Image source={CURRENT_POSITION} style={styles.marker} />
            </Marker>
          </MapView>
        ) : null}
        <View style={styles.container}>
          <View style={styles.card}>
            <LinearGradient
              style={styles.avatarWrapper}
              colors={['#EF955E', '#BD5A5E']}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Image source={avatar} style={styles.avatar} />
            </LinearGradient>
            <View style={styles.br} />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.br} />
            <ListItem
              icon={PHONE}
              title={phoneNumber}
              subTitle="Phone Number"
            />
            <ListItem icon={MAIL} title={email} subTitle="Email" />
            <ListItem icon={FACEBOOK} title={facebook} subTitle="Facebook" />
            <ListItem icon={PLACE} title={address} subTitle="Address" />
          </View>
        </View>
      </View>
    )
  }
}

const mapState = state => state.profile

export default connect(
  mapState,
  { fetchProfile }
)(ProfileScreen)

const { width: WIDTH } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3
const avatarWrapperSize = avatarSize + 10

const styles = StyleSheet.create({
  screenHeader: {
    paddingHorizontal: '5%'
  },
  marker: {
    width: 50,
    height: 50
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  br: {
    marginVertical: 5
  },
  avatarWrapper: {
    width: avatarWrapperSize,
    height: avatarWrapperSize,
    borderRadius: avatarWrapperSize / 2,
    justifyContent: 'center',
    alignItems: 'center'
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
  screenTitle: {
    fontSize: 34,
    fontWeight: '600'
  },
  card: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    alignSelf: 'center',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 0,
    paddingBottom: 5
    // marginTop: -10,
    // overflow: 'hidden'
  },
  container: {
    width: '100%',
    position: 'absolute',
    top: 150,
    backgroundColor: 'transparent',
    paddingHorizontal: '5%'
  },
  top: {
    flex: 1
  },
  mapView: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})
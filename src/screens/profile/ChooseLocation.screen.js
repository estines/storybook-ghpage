import React, { Component, Fragment } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { MapView, Permissions, Location } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { connect } from 'react-redux'

// assets
import CURRENT_POSITION from '../../assets/icon/current-position.png'
import PLACE_OUTLINE from '../../assets/icon/place-outline.png'
import MARKER_BG from '../../assets/icon/marker-bg.png'
// config
import { mapStyle } from '../../config'
import { fetchProfile, onProfileFormChange } from '../../store/actions'

// components
import Header from '../../components/Header.component'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

const { PROVIDER_GOOGLE, Marker } = MapView

class ChooseLocation extends Component {
  state = {
    location: null,
    region: null
  }
  componentDidMount () {
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
    await Permissions.askAsync(Permissions.LOCATION)
    const { location: userLocation } = this.props
    let location = await Location.getCurrentPositionAsync({})
    if (userLocation && userLocation !== null) {
      this.setState({
        location: location,
        region: userLocation
      })
    } else {
      let location = await Location.getCurrentPositionAsync({})
      if (location && location.coords) {
        const latlng = {
          ...location.coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        this.setState({
          location: latlng,
          region: latlng
        })
      }
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  renderMapBody = () => {
    const { location } = this.state
    if (location && location !== null) {
      return (
        <Fragment>
          <Header
            left="cancel"
            right="save"
            center="Choose location"
            onPressLeft={this.back}
            onPressRight={this.save}
          />
          <Marker coordinate={location}>
            <Image source={CURRENT_POSITION} style={styles.marker} />
          </Marker>
        </Fragment>
      )
    }
  }

  goToCurrent = () => {
    const { location } = this.state
    this.setState({
      location,
      region: location
    })
  }

  onRegionChange = region => {
    setTimeout(() => {
      this.setState({ region })
    }, 1000)
  }

  getAddress = async () => {
    try {
      const { region } = this.state
      const { latitude, longitude } = region
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCl8evSjbB1aY6GjlCambRUkl5dzjt1YrU`
      )
      const { data } = res
      const { results } = data
      let address = ''
      if (results && results.length > 0) {
        address = results[0].formatted_address
      }
      return address
    } catch (error) {
      console.log(error, 'error')
    }
  }

  save = async () => {
    try {
      const address = await this.getAddress()
      const { region } = this.state
      this.props.onProfileFormChange({ address, location: region })
      this.back()
    } catch (error) {
      console.log(error, 'error....')
    }
  }

  render () {
    const { location, region } = this.state
    return (
      <View style={styles.screen}>
        <MapView
          style={styles.mapView}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          region={region}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          customMapStyle={mapStyle}
          onRegionChange={this.onRegionChange}
        >
          {this.renderMapBody()}
        </MapView>
        <TouchableOpacity style={styles.card} onPress={this.goToCurrent}>
          <Image source={PLACE_OUTLINE} style={styles.cardIcon} />
          <View style={styles.center}>
            <Text style={styles.cardTitle}>Where are you?</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#E45655"
          />
        </TouchableOpacity>
        <View style={styles.userMarker} pointerEvents="none">
          <View style={styles.markerBg}>
            <Image source={{ uri: ED_SHEERAN }} style={styles.avatar} />
          </View>
          <View style={styles.markerTail} />
        </View>
      </View>
    )
  }
}

const mapState = state => state.profile

export default connect(
  mapState,
  { fetchProfile, onProfileFormChange }
)(ChooseLocation)

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const avatarSize = WIDTH * 0.15
const avatarWrapperSize = avatarSize + 10
const triangleWidth = avatarWrapperSize / 4 + 5
const styles = StyleSheet.create({
  userMarker: {
    alignItems: 'center',
    paddingBottom: '50%',
    zIndex: 100,
    position: 'absolute',
    top: HEIGHT * 0.4 - 25,
    alignSelf: 'center'
  },
  markerTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: triangleWidth,
    borderRightWidth: triangleWidth,
    borderBottomWidth: triangleWidth * 1.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
    transform: [{ rotate: '180deg' }],
    marginTop: -10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10
  },
  markerBg: {
    backgroundColor: '#FFF',
    width: avatarWrapperSize,
    height: avatarWrapperSize,
    borderRadius: avatarWrapperSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    zIndex: 1000
  },
  cardTitle: {},
  center: {
    flex: 1,
    paddingLeft: 20
  },
  marker: {
    width: 50,
    height: 50
  },

  card: {
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1
    },
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  mapView: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

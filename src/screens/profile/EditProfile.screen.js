import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { connect } from 'react-redux'

// components
import Header from '../../components/Header.component'
import ImageSource from '../../components/modals/ImageSource.modal'
import GalleryPicker from '../../components/modals/GalleryPicker.component'
import Spinner from '../../components/Spinner.component'

// services
import { fetchProfile, onProfileFormChange } from '../../store/actions'
import AuthService from '../../services/auth.service'
import ImageService from '../../services/image.service'

import AVATAR from '../../assets/img/boy.png'

class EditProfileScreen extends Component {
  state = {
    imageSourceVisible: false,
    galleryVisible: false,
    loading: false
  }

  showGallery = () => {
    this.setState({
      galleryVisible: true,
      imageSourceVisible: false
    })
  }

  toggleImageSource = () => {
    const { imageSourceVisible } = this.state
    this.setState({
      imageSourceVisible: !imageSourceVisible
    })
  }

  onSelectImage = data => {
    console.log(data, 'data.uri...')
    this.setState({
      galleryVisible: false,
      file: data
    })
    this.props.onProfileFormChange({ image: data.uri })
  }

  removeImage = () => {
    this.setState({
      image: '',
      imageSourceVisible: false
    })
  }

  back = () => {
    this.props.fetchProfile()
    this.props.navigation.goBack()
  }

  showMap = () => {
    this.props.navigation.navigate('ChooseLocation')
  }

  save = async () => {
    try {
      this.setState({ loading: true })
      let {
        phoneNumber,
        email,
        bio,
        address,
        image,
        name,
        location
      } = this.props

      // check image is local
      if (image && image.includes('assets-library')) {
        const { file } = this.state
        const urls = await ImageService.upload([file.uri])
        image = urls[0]
      }

      await AuthService.updateProfile({
        phoneNumber,
        email,
        bio,
        address,
        image,
        name,
        location
      })
      this.setState({ loading: false })
      this.back()
      setTimeout(() => {
        Alert.alert('Profile Updated.')
      }, 500)
    } catch (error) {
      this.setState({ loading: false })
      console.log(error.response, 'error...')
      setTimeout(() => {
        const err = error.response ? error.response.data : error
        Alert.alert('Error', err.message)
      }, 500)
    }
  }

  render () {
    const { imageSourceVisible, galleryVisible, loading } = this.state
    const {
      phoneNumber,
      email,
      bio,
      address,
      image,
      name,
      onProfileFormChange
    } = this.props
    const options = [
      { title: 'New Profile Photo', onPress: this.showGallery },
      { title: 'Import from Facebook', onPress: () => ({}) },
      { title: 'Remove Profile Photo', onPress: this.removeImage }
    ]
    let avatar = AVATAR
    if (image && image !== null) {
      if (image.includes('assets-library')) {
        avatar = { uri: image }
      } else {
        avatar = {
          uri: `https://orderking.s3.amazonaws.com/images/thumbnail/${image}`
        }
      }
    }
    console.log(avatar, 'avatar....')
    return (
      <ScrollView style={styles.screen} scrollEnabled={false}>
        <Header
          center="Edit Profile"
          left="cancel"
          right="save"
          hasShadow
          onPressLeft={this.back}
          onPressRight={this.save}
        />
        <View style={styles.container}>
          <Image source={avatar} style={styles.avatar} />
          <View style={styles.br} />
          <View style={styles.br} />
          <TouchableOpacity onPress={this.toggleImageSource}>
            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>
          <View style={styles.br} />
          <TextField
            value={name}
            onChangeText={name => onProfileFormChange({ name })}
            label="Name"
            containerStyle={styles.input}
          />
          <TextField
            value={bio}
            onChangeText={bio => onProfileFormChange({ bio })}
            label="Bio"
            containerStyle={styles.input}
          />
          <TextField
            value={phoneNumber}
            onChangeText={phoneNumber => onProfileFormChange({ phoneNumber })}
            label="Phone Number"
            containerStyle={styles.input}
          />
          <TextField
            value={email}
            onChangeText={email => onProfileFormChange({ email })}
            label="Email"
            containerStyle={styles.input}
          />
          <TextField
            value={address}
            onChangeText={address => onProfileFormChange({ address })}
            label="Address"
            containerStyle={styles.input}
            onFocus={this.showMap}
          />
        </View>
        <ImageSource
          onClose={this.toggleImageSource}
          visible={imageSourceVisible}
          options={options}
          title="Set a profile photo"
        />
        <GalleryPicker
          onClose={() => this.setState({ galleryVisible: false })}
          visible={galleryVisible}
          onSelect={this.onSelectImage}
        />
        <Spinner visible={loading} />
      </ScrollView>
    )
  }
}

const mapState = state => state.profile

export default connect(
  mapState,
  { fetchProfile, onProfileFormChange }
)(EditProfileScreen)

const { width: WIDTH } = Dimensions.get('window')

const avatarSize = WIDTH * 0.3

const styles = StyleSheet.create({
  input: {
    width: '100%'
  },
  changePhoto: {
    color: '#007AFF'
  },
  br: {
    marginVertical: 5
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    borderColor: '#FFF',
    borderWidth: avatarSize / 20
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: '10%',
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

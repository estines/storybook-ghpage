import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { TextField } from 'react-native-material-textfield'

// components
import Header from '../../components/Header.component'
import ImageSource from '../../components/modals/ImageSource.modal'
import GalleryPicker from '../../components/modals/GalleryPicker.component'

const ED_SHEERAN = 'https://ichef.bbci.co.uk/images/ic/960x540/p02kq8k6.jpg'

export default class ProfileScreen extends Component {
  state = {
    phoneNumber: '+123 456 789 234',
    email: 'Shawneat@mail.com',
    facebook: 'Shawn Mentos Facebook',
    address: '497 Sukhumvit road, Silom',
    bio: 'Literally born to eat burgers Bangkok based.',
    imageSourceVisible: false,
    galleryVisible: false,
    image: ED_SHEERAN
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
    console.log(data, 'data...')
    this.setState({
      galleryVisible: false,
      image: data.uri
    })
  }

  removeImage = () => {
    this.setState({
      image: '',
      imageSourceVisible: false
    })
  }

  back = () => {
    this.props.navigation.goBack()
  }

  showMap = () => {
    this.props.navigation.navigate('ChooseLocation')
  }

  render () {
    const {
      phoneNumber,
      email,
      bio,
      address,
      image,
      imageSourceVisible,
      galleryVisible
    } = this.state

    const options = [
      { title: 'New Profile Photo', onPress: this.showGallery },
      { title: 'Import from Facebook', onPress: () => ({}) },
      { title: 'Remove Profile Photo', onPress: this.removeImage }
    ]

    return (
      <ScrollView style={styles.screen} scrollEnabled={false}>
        <Header
          center="Edit Profile"
          left="cancel"
          right="save"
          hasShadow
          onPressLeft={this.back}
          onPressRight={this.back}
        />
        <View style={styles.container}>
          <Image source={{ uri: image }} style={[styles.avatar]} />
          <View style={styles.br} />
          <View style={styles.br} />
          <TouchableOpacity onPress={this.toggleImageSource}>
            <Text style={styles.changePhoto}>Change Photo</Text>
          </TouchableOpacity>
          <View style={styles.br} />
          <TextField
            value={phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            label="Name"
            containerStyle={styles.input}
          />
          <TextField
            value={bio}
            onChangeText={bio => this.setState({ bio })}
            label="Bio"
            containerStyle={styles.input}
          />
          <TextField
            value={phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            label="Phone Number"
            containerStyle={styles.input}
          />
          <TextField
            value={email}
            onChangeText={email => this.setState({ email })}
            label="Email"
            containerStyle={styles.input}
          />
          <TextField
            value={address}
            onChangeText={address => this.setState({ address })}
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
      </ScrollView>
    )
  }
}

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

import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { ImagePicker, Permissions } from 'expo'
import AVATAR from '../../assets/icon/avatar-white.png'

@connectActionSheet
class AvatarInput extends Component {
  showGallery = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const file = await ImagePicker.launchImageLibraryAsync()
    this.props.onChange(file)
  }

  showCamera = async () => {
    await Permissions.askAsync(Permissions.CAMERA)
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const file = await ImagePicker.launchCameraAsync()
    this.props.onChange(file)
  }

  _onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Camera', 'Gallery', 'Cancel']

    const cancelButtonIndex = 2

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Select picture source'
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          this.showGallery()
        } else if (buttonIndex === 0) {
          this.showCamera()
        }
      }
    )
  }

  render () {
    const { value } = this.props
    return (
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <View style={styles.avatarWrapper}>
            {value && value !== null ? (
              <Image source={{ uri: value }} style={styles.avatar} />
            ) : (
              <Image source={AVATAR} style={styles.avatarPlaceholder} />
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onOpenActionSheet}
          >
            <MaterialIcons name="add" size={24} color="#4A6CA5" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  avatarWrapper: {
    backgroundColor: '#F2F2F6',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    position: 'relative'
  }
})

export default AvatarInput

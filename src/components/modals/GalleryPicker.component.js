import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  CameraRoll,
  Dimensions,
  Modal,
  ImageBackground
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Permissions } from 'expo'

import LINE from '../../assets/icon/line.png'

export default class MenuDetailModal extends Component {
  state = {
    photos: []
  }

  componentDidMount () {
    this.fetchGallery()
  }

  fetchGallery = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
    let photo = await CameraRoll.getPhotos({ first: 100 })
    this.setState({ photos: photo.edges })
  }

  renderPhotos = ({ item }) => {
    const { selected } = this.props
    const { node } = item
    const { onSelect, multiple } = this.props
    if (multiple) {
      const index = selected.findIndex(i => i === node.image.uri)
      return (
        <TouchableOpacity onPress={() => onSelect(node.image)}>
          <ImageBackground source={node.image} style={styles.image}>
            {index > -1 ? (
              <View style={[styles.marker, styles.selectedMarker]}>
                <Text style={styles.index}>{index + 1}</Text>
              </View>
            ) : (
              <View style={styles.marker} />
            )}
          </ImageBackground>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => onSelect(node.image)}>
          <ImageBackground source={node.image} style={styles.image} />
        </TouchableOpacity>
      )
    }
  }

  render () {
    const { photos } = this.state
    const { visible, onClose } = this.props
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.top} onPress={onClose}>
            <SafeAreaView>
              <Image source={LINE} />
            </SafeAreaView>
            <View style={styles.br} />
            <View style={styles.textRow}>
              <Text style={styles.title}>Gallery</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="gray"
                style={{ marginLeft: 10, marginTop: 5 }}
              />
            </View>
            <View style={styles.br} />
          </TouchableOpacity>
          <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderPhotos}
            extraData={this.state}
            style={{ flex: 1, width: '100%' }}
            numColumns={3}
            columnWrapperStyle={styles.row}
          />
        </View>
      </Modal>
    )
  }
}

const { width: WIDTH } = Dimensions.get('window')

const imageSize = WIDTH / 3 - 1

const styles = StyleSheet.create({
  selectedMarker: {
    backgroundColor: '#E45655'
  },
  index: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 10
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 2,
    borderColor: '#FFF',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
    marginLeft: -1,
    marginRight: -1,
    marginBottom: 1
  },
  image: {
    width: imageSize,
    height: imageSize
  },
  top: {
    alignItems: 'center',
    width: '100%'
  },

  textRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  br: {
    marginVertical: 10
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})

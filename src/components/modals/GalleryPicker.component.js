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
  Modal
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
    const { node } = item
    const { onSelect } = this.props
    return (
      <TouchableOpacity onPress={() => onSelect(node.image)}>
        <Image source={node.image} style={styles.image} />
      </TouchableOpacity>
    )
  }

  render () {
    const { photos } = this.state
    const { visible } = this.props
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.top}>
            <SafeAreaView>
              <Image source={LINE} />
            </SafeAreaView>
            <View style={styles.br} />
            <View style={styles.textRow}>
              <Text style={styles.title}>Menu Detail</Text>
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

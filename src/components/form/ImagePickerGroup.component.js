import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList
} from 'react-native'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'
import { ImagePicker, Permissions } from 'expo'
const IMAGES = [
  'https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg',
  'https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg'
  // 'https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg'
]

const renderImage = ({ item }) => {
  return <Image source={{ uri: item }} style={styles.image} />
}
const renderImages = images => {
  if (images.length > 0 && images.length < 3) {
    return images.map((image, index) => {
      return <Image source={{ uri: image }} key={index} style={styles.image} />
    })
  } else if (images.length > 2) {
    return (
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        extraData={images}
        renderItem={renderImage}
        horizontal
        style={{ width: '100%' }}
      />
    )
  }
}

const openPicker = async onChange => {
  await Permissions.askAsync(Permissions.CAMERA_ROLL)
  const image = await ImagePicker.launchImageLibraryAsync()
  if (image && image.uri) {
    onChange(image.uri)
  }
}

const ImagePickerGroup = props => {
  const { images, onChange } = props
  return (
    <View style={styles.wrapper}>
      {renderImages(images)}
      {images.length < 3 ? (
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => openPicker(onChange)}
          >
            <MaterialIcons name="add" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.circle, styles.absoluteButton]}
          onPress={() => openPicker(onChange)}
        >
          <MaterialIcons name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  )
}

ImagePickerGroup.defaultProps = {
  images: IMAGES
}

ImagePickerGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string)
}

export default ImagePickerGroup

const { width: WIDTH } = Dimensions.get('window')

const imageSize = WIDTH * 0.3

const styles = StyleSheet.create({
  absoluteButton: {
    position: 'absolute',
    bottom: 0,
    right: 10
  },
  image: {
    width: imageSize,
    height: imageSize,
    marginHorizontal: 5
  },
  circle: {
    backgroundColor: '#36507E',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add: {
    width: imageSize,
    height: imageSize,
    backgroundColor: '#FFF',
    shadowColor: '#dbdbdb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 20
  }
})

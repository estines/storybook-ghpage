import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'

export default class CircleMenuBtn extends React.Component {
  state = {
    isCollapsed: false
  }
  openGallery = () => {
    this.props.openGallery()
    this.setState({
      isCollapsed: false
    })
  }
  render () {
    const { isCollapsed } = this.state
    return (
      <View style={styles.wrapper}>
        {isCollapsed ? (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Add photos</Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.option}>
                <Image source={require('../assets/icon/photo-camera.png')} />
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>
              <View style={styles.hr} />
              <TouchableOpacity style={styles.option} onPress={this.openGallery}>
                <Image source={require('../assets/icon/photos.png')} />
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            styles.circleBtn,
            {
              backgroundColor: isCollapsed ? '#E5E5EA' : '#E45655'
            }
          ]}
          onPress={() => this.setState({ isCollapsed: !isCollapsed })}
        >
          <MaterialIcons
            name="add"
            size={40}
            color="#FFF"
            style={{ transform: [{ rotate: isCollapsed ? '45deg' : '90deg' }] }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  optionText: {
    marginLeft: 10
  },
  hr: {
    width: '80%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: '#dbdbdb'
  },
  options: {
    padding: 10
  },
  option: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    height: 'auto',
    width: 200
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E45655',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  wrapper: {
    alignItems: 'center'
  }
})

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

// services
import StampService from '../../services/stamp.service'

const AppHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <Header
        leftComponent={{
          icon: 'close',
          color: '#000000',
          size: 25,
          onPress: props.back
        }}
        rightComponent={{
          text: 'Edit',
          style: { color: '#007AFF', fontSize: 18 }
        }}
        containerStyle={{
          backgroundColor: '#FFF',
          justifyContent: 'space-around',
          borderBottomWidth: 0,
          paddingTop: ifIphoneX ? 0 : 10
        }}
      />
    </SafeAreaView>
  )
}

export default class StampScreen extends Component {
  state = {
    stamps: []
  }

  componentDidMount = () => {
    this.fetchStamp()
  }

  fetchStamp = () => {
    const stamps = StampService.list()
    this.setState({
      stamps
    })
  }

  renderStamp = ({ item }) => {
    const { name, img, quantity } = item
    return (
      <View style={styles.stamp}>
        <Image source={img} style={styles.stampImg} />
        <View style={styles.stampContent}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.quantity}>{quantity} Stamps</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="#CECECE" />
      </View>
    )
  }
  render () {
    const { stamps } = this.state
    return (
      <View style={styles.screen}>
        <AppHeader back={this.back} />
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Stamp</Text>
        </View>
        <FlatList
          data={stamps}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderStamp}
          extraData={this.state}
          contentContainerStyle={styles.container}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quantity: {
    fontSize: 10,
    color: '#7E7E7E'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  stampImg: {
    marginRight: 10
  },
  stampContent: {
    flex: 1
  },
  stamp: {
    backgroundColor: '#FFF',
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#F17975',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  subHeaderTitle: {
    fontSize: 34,
    fontWeight: '600'
  },
  subHeader: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    paddingTop: 0,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  container: {
    paddingHorizontal: '5%',
    backgroundColor: '#F6F6F6'
  },
  screen: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
})

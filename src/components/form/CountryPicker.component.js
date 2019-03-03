import React from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
  SafeAreaView
} from 'react-native'
import { Header } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { MaterialIcons } from '@expo/vector-icons'

import COUNTRIES from '../../libs/contry'

const AppHeader = props => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <Header
        leftComponent={{
          icon: 'keyboard-arrow-left',
          color: '#000000',
          size: 30,
          onPress: props.back
        }}
        centerComponent={{
          text: 'Select Country',
          style: { color: '#000000', fontSize: 18 }
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

export default class CountryPicker extends React.Component {
  state = {
    visible: false
  }

  toggle = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  renderCountry = ({ item }, selected) => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            this.props.onSelect(item.name)
            this.toggle()
          }}
        >
          <View style={styles.left}>
            <Image source={{ uri: item.flag }} style={styles.flag} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
          {selected && selected !== null && selected === item.name ? (
            <MaterialIcons name="check" size={20} color="#41619B" />
          ) : null}
        </TouchableOpacity>
      )
    }
  }

  render () {
    const { selected, label, inputStyles } = this.props
    const { visible } = this.state
    console.log(selected, 'selected...')
    const selectedItem = COUNTRIES.find(c => c.name === selected)
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.br} />
        <TouchableOpacity
          style={[styles.input, inputStyles]}
          onPress={this.toggle}
        >
          {selectedItem && selectedItem.name ? (
            [
              <Image source={{ uri: selectedItem.flag }} style={styles.flag} />,
              <Text style={[styles.name]}>{selectedItem.name}</Text>
            ]
          ) : (
            <Text style={[styles.name]}>Choose country</Text>
          )}
        </TouchableOpacity>
        <Modal visible={visible} animationType="fade">
          <View style={styles.wrapper}>
            <AppHeader back={this.toggle} />
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item, index) => index.toString()}
              renderItem={item => this.renderCountry(item, selected)}
              extraData={selected}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

CountryPicker.defaultProps = {
  label: 'Country',
  borderWidth: 1,
  inputStyles: {
    backgroundColor: '#FFF'
  },
  selected: 'Thailand'
}

const styles = StyleSheet.create({
  br: {
    marginVertical: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputWrapper: {
    width: '100%'
  },
  flag: {
    marginRight: 10,
    width: 30,
    height: 20,
    resizeMode: 'contain'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    borderColor: '#CCCCCC',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

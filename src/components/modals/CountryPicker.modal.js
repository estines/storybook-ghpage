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

const renderCountry = ({ item }, selected, onSelect, back) => {
  return (
    <TouchableOpacity
      style={styles.list}
      onPress={() => {
        onSelect(item)
        back()
      }}
    >
      <View style={styles.left}>
        <Image source={{ uri: item.flag }} style={styles.flag} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      {selected !== null && selected.name === item.name ? (
        <MaterialIcons name="check" size={20} color="#CCCCCC" />
      ) : null}
    </TouchableOpacity>
  )
}

export default props => {
  const { visible, onSelect, toggle, selected } = props
  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.wrapper}>
        <AppHeader back={toggle} />
        <FlatList
          data={COUNTRIES}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => renderCountry(item, selected, onSelect, toggle)}
          extraData={selected}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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

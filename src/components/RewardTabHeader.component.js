import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default props => {
  const { selected, onSelect } = props
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.tab, selected === 'available' ? styles.selectedTab : null]}
        onPress={() => onSelect('available')}
      >
        <Text
          style={[
            styles.title,
            selected === 'available' ? styles.selectedTitle : null
          ]}
        >
          Available
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selected === 'history' ? styles.selectedTab : null]}
        onPress={() => onSelect('history')}
      >
        <Text
          style={[
            styles.title,
            selected === 'history' ? styles.selectedTitle : null
          ]}
        >
          History
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedTitle: {
    color: '#FFF'
  },
  selectedTab: {
    backgroundColor: '#E45655',
    borderRadius: 30
  },
  title: {
    color: '#CECECE'
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flexDirection: 'row',
    marginTop: -30,
    borderRadius: 30,
    padding: 4,
    zIndex: 100
  }
})

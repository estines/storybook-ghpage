import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default props => {
  const { selected, onSelect } = props
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.tab, selected === 'cash' ? styles.selectedTab : null]}
        onPress={() => onSelect('cash')}
      >
        <Text
          style={[
            styles.title,
            selected === 'cash' ? styles.selectedTitle : null
          ]}
        >
          Cash
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selected === 'card' ? styles.selectedTab : null]}
        onPress={() => onSelect('card')}
      >
        <Text
          style={[
            styles.title,
            selected === 'card' ? styles.selectedTitle : null
          ]}
        >
          Card
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
    marginTop: 0,
    borderRadius: 30,
    padding: 4,
    zIndex: 1000,
    elevation: 1
  }
})

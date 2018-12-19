import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default props => {
  const { value, onChange, size } = props
  const hasValue = value && value > 0
  const tintColor = hasValue ? '#E8615F' : '#000'
  const plusIconColor = hasValue ? '#FFF' : '#000'
  const plusBgcolor = hasValue ? '#E8615F' : '#FFF'
  const borderColor = hasValue ? '#E8615F' : '#D4D4D4'
  const wrapperBorderColor = hasValue ? '#E8615F' : '#E3E3E3'
  if (size === 'big') {
    return (
      <View style={[bigStyles.wrapper, { borderColor: wrapperBorderColor }]}>
        <TouchableOpacity
          style={[
            bigStyles.button,
            bigStyles.leftButton,
            { borderColor: borderColor }
          ]}
          onPress={() => onChange('DECREMENT')}
        >
          <AntDesign name="minus" size={24} color={tintColor} />
        </TouchableOpacity>
        <Text style={bigStyles.value}>{value}</Text>
        <TouchableOpacity
          style={[
            bigStyles.button,
            bigStyles.rightButton,
            { backgroundColor: tintColor, borderColor: borderColor }
          ]}
          onPress={() => onChange('INCREMENT')}
        >
          <AntDesign name="plus" size={20} color={plusIconColor} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={[styles.wrapper, { borderColor: wrapperBorderColor }]}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton, { borderColor: borderColor }]}
          onPress={() => onChange('DECREMENT')}
        >
          <AntDesign name="minus" size={15} color={tintColor} />
        </TouchableOpacity>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            { backgroundColor: plusBgcolor, borderColor: borderColor }
          ]}
          onPress={() => onChange('INCREMENT')}
        >
          <AntDesign name="plus" size={15} color={plusIconColor} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rightButton: {
    marginLeft: 10
  },
  leftButton: {
    marginRight: 10
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#FFF',
    marginVertical: -2
  },
  wrapper: {
    borderWidth: 0.8,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderRightWidth: 0,
    borderLeftWidth: 0
  }
})

const bigStyles = StyleSheet.create({
  rightButton: {
    marginLeft: 20
  },
  leftButton: {
    marginRight: 20
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#FFF',
    marginVertical: -1.5
  },
  wrapper: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderRightWidth: 0,
    borderLeftWidth: 0
  }
})

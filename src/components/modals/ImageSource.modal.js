import React from 'react'
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

export default props => {
  const { visible, options, title, onClose } = props
  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {options.map((option, index) => (
            <TouchableOpacity
              style={styles.option}
              onPress={option.onPress}
              key={index.toString()}
              pointerEvents="auto"
            >
              <Text style={styles.optionTitle}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 10
  },
  optionTitle: {
    color: '#000'
  },
  title: {
    fontWeight: '700'
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center'
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '80%',
    zIndex: 100
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    zIndex: 100
  }
})

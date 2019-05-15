import React from 'react'
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native'

const Spinner = props => {
  const { visible, title } = props
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color="#E45655" />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Modal>
  )
}

Spinner.defaultProps = {
  visible: false,
  title: 'Loading'
}

export default Spinner

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    color: '#E45655'
  },
  card: {
    backgroundColor: '#FFF',
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 100,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    paddingBottom: '30%',
    alignItems: 'center'
  }
})

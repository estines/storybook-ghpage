import React from 'react'
import { Modal, View, StyleSheet, Text, Dimensions } from 'react-native'
import { BarCodeScanner } from 'expo'
import { Button } from 'react-native-elements'

export default props => {
  const { visible, onClose, onRead } = props
  return (
    <Modal visible={visible} transparent animationType="fade">
      <BarCodeScanner style={styles.scanner} onBarCodeRead={onRead}>
        <View style={styles.blur} />
        <View style={styles.scanRow}>
          <View style={styles.blur} />
          <View style={styles.clear} />
          <View style={styles.blur} />
        </View>

        <View style={[styles.blur, styles.bottom]}>
          <Text style={styles.title}>Scanning code...</Text>
        </View>
      </BarCodeScanner>
      <View style={styles.wrapper} />
      <Button
        title="Cancel"
        buttonStyle={styles.button}
        onPress={onClose}
        containerStyle={styles.btnWrapper}
      />
    </Modal>
  )
}

const { height: HEIGHT } = Dimensions.get('window')

const styles = StyleSheet.create({
  btnWrapper: {
    position: 'absolute',
    bottom: 0,
    marginBottom: HEIGHT / 4,
    width: '100%'
  },
  button: {
    marginTop: 50,
    padding: 5,
    borderRadius: 30,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1000,

    width: '60%',
    alignSelf: 'center'
  },
  bottom: {
    flex: 2,
    alignItems: 'center',
    paddingVertical: '10%'
  },
  title: {
    color: '#000',
    fontWeight: 'bold'
  },
  scanRow: {
    flexDirection: 'row'
  },
  blur: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  clear: {
    backgroundColor: 'transparent',
    height: 300,
    width: 300
  },
  scanner: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})

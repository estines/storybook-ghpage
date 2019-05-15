import React from 'react'
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

const subTitle = `
Your request has been sent
Please wait for the staff
`

export default props => {
  const { visible, onPress } = props
  return (
    <Modal visible={visible} transparent>
      <View style={styles.wrapper}>
        <View style={styles.dialog}>
          <View style={styles.circle}>
            <Image
              source={require('../assets/icon/clock-rotate.png')}
              style={styles.icon}
            />
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* <Text style={styles.title}>Are you sure ?</Text> */}
              <Text style={styles.subTitle}>
                { subTitle }
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={[styles.button, styles.highlightButton]} onPress={onPress}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#FFF',
    fontWeight: '500'
  },
  button: {
    padding: 15,
    alignItems: 'center'
  },
  cardFooter: {
    flexDirection: 'row'
  },
  highlightButton: {
    backgroundColor: '#E8615F',
    flex: 1
  },
  cardContent: {
    alignItems: 'center',
    padding: '5%',
    paddingTop: 20
  },
  subTitle: {
    fontSize: 14,
    color: '#7E7E7E',
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    marginTop: -50,
    paddingTop: 30,
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden'
  },
  icon: {},
  dialog: {
    alignItems: 'center',
    paddingHorizontal: '15%',
    position: 'relative'
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8615F',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center'
  }
})

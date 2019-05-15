import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Br = props => {
  const { size } = props
  return <View style={[styles.br, { marginVertical: size }]} />
}

Br.defaultProps = {
  size: 5
}

Br.propTypes = {
  size: PropTypes.number
}

export default Br

const styles = StyleSheet.create({
  br: {
    marginVertical: 5
  }
})

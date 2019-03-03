import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Column = props => {
  const { flex, style, paddingLeft, paddingRight } = props
  return (
    <View
      style={[
        styles.column,
        style || {},
        { flex: flex || 1, paddingLeft, paddingRight }
      ]}
    >
      {props.children}
    </View>
  )
}

Column.defaultProps = {
  paddingLeft: 0,
  paddingRight: 0
}

Column.propTypes = {
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number
}

export default Column

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
})

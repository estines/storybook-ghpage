import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RoundButton = ({ title }) => (
  <TouchableOpacity style={styles.button}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff5959',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RoundButton;

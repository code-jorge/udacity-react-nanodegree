import React                              from 'react'
import {Platform, View, Text}             from 'react-native'
import {StyleSheet, TouchableOpacity}     from 'react-native'

export default function Button({onPress, style, title, color, disabled}) {

  const noop = ()=> {}

  const defaultStyle = Platform.OS === 'ios' ? styles.iosButton : styles.androidButton
  const border = {borderWidth: 1, borderColor: color === 'white' ? 'black' : color}
  const textColor = {color: color === 'white' ? 'black' : 'white'}

  if (disabled) {
    return (
      <View style={[defaultStyle, style, styles.disabled]}>
        <Text style={[styles.buttonText, {color: 'white'}]}>{title}</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[defaultStyle, border, style, {backgroundColor: color}]}>
      <Text style={[styles.buttonText, textColor]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosButton: {
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    width: 300,
    marginBottom: 20,
  },
  androidButton: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: '#b3b3b3',
    borderColor: '#b3b3b3',
    borderWidth: 1
  }
})

import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet}                    from 'react-native'
import {TextInput, Platform}           from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import {saveDeckTitle}                 from '../utils/api'
import {deckAdd}                       from '../actions'
import Button                          from './Button'

class DeckAdd extends Component {

  state = {
    text: ''
  }

  submit = ()=> {

    const {text} = this.state

    this.props.createDeck(text)
      .then(()=> {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Home'}),
            NavigationActions.navigate({
              routeName: 'DeckData',
              params: {deck: text}
            })
          ]
        }))
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={[styles.input, Platform.OS === 'ios' ? styles.iosInput : {}]}
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          style={styles.button}
          color='black'
          onPress={this.submit}
          title='Submit'
          disabled={this.state.text.trim() === '' || this.props.titles.indexOf(this.state.text.trim()) != -1}
        />
      </View>
    )
  }

}

function mapStateToProps({decks}) {
  return {
    titles: Object.keys(decks || {})
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createDeck: title=> saveDeckTitle(title).then(()=> dispatch(deckAdd(title)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    textAlign: 'center'
  },
  input: {
    margin: 40,
    width: 250,
    height: 60,
    padding: 8,
  },
  iosInput: {
    backgroundColor: '#ededed'
  },
  button: {
    padding: 6
  }
})

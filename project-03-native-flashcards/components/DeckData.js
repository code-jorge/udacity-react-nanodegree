import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet}                    from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import {clearLocalNotification}        from '../utils/notifications'
import {setLocalNotification}          from '../utils/notifications'
import Button                          from './Button'

class DeckData extends Component {

  state = {
    text: ''
  }

  quiz = (deck)=> {

    clearLocalNotification()
      .then(setLocalNotification)

    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckQuiz',
      params: {deck}
    }))
  }

  addCard = (deck)=> {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'CardAdd',
      params: {deck}
    }))
  }

  render() {

    const {title, questions} = this.props.deck

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.subtext}>{questions.length} cards</Text>
        </View>
        <Button
          style={styles.button}
          color='white'
          onPress={this.addCard.bind(this, title)}
          title='Add card'
        />
        <Button
          style={styles.button}
          color='black'
          onPress={this.quiz.bind(this, title)}
          title='Start quiz'
          disabled={questions.length === 0}
        />
      </View>
    )
  }

}

function mapStateToProps({decks}, {navigation}) {
  const {deck} = navigation.state.params
  return {
    deck: decks[deck]
  }
}

export default connect(mapStateToProps)(DeckData)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginBottom: 80
  },
  text: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 24,
    color: '#8a8a8a',
    textAlign: 'center'
  },
  button: {
    padding: 6
  }
})

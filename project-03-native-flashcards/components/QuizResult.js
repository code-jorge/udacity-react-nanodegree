import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet}                    from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import {clearLocalNotification}        from '../utils/notifications'
import {setLocalNotification}          from '../utils/notifications'
import Button                          from './Button'

class QuizResult extends Component {

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

    const {title} = this.props.deck
    const {answers} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>Quiz completed!</Text>
          <Text style={styles.subtext}>
            You got a {(100*answers.correct/(answers.correct+answers.incorrect)).toFixed(2)}%
          </Text>
          <Text style={styles.subtext}>
            You answered {answers.correct} cards correctly and {answers.incorrect} cards incorrectly
          </Text>
        </View>
        <Button
          style={styles.button}
          color='black'
          onPress={this.quiz.bind(this, title)}
          title='Restart quiz'
        />
      </View>
    )
  }

}

function mapStateToProps({decks}, {navigation}) {
  const {deck, answers} = navigation.state.params
  return {
    deck: decks[deck],
    answers
  }
}

export default connect(mapStateToProps)(QuizResult)

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
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    padding: 6
  }
})

import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet}            from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import Button                          from './Button'

class DeckQuiz extends Component {

  state = {
    answers: {
      correct: 0,
      incorrect: 0
    },
    current_question: 0,
    visible: 'question'
  }

  showAnswer = ()=> {
    this.setState({visible: 'answer'})
  }

  correctAnswer = ()=> {
    this.setState(state=> ({
      current_question: state.current_question+1,
      visible: 'question',
      answers: {
        correct: state.answers.correct+1,
        incorrect: state.answers.incorrect
      }
    }), this.finish)
  }

  incorrectAnswer = ()=> {
    this.setState(state=> ({
      current_question: state.current_question+1,
      visible: 'question',
      answers: {
        correct: state.answers.correct,
        incorrect: state.answers.incorrect+1
      }
    }), this.finish)
  }

  finish = ()=> {
    if (this.state.current_question === this.props.deck.questions.length) {
      const {deck} = this.props.navigation.state.params
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({routeName: 'Home'}),
          NavigationActions.navigate({
            routeName: 'DeckData',
            params: {deck}
          }),
          NavigationActions.navigate({
            routeName: 'QuizResult',
            params: {
              deck,
              answers: this.state.answers
            }
          })
        ]
      }))
    }
  }

  render() {

    const {questions} = this.props.deck
    const current = this.state.current_question

    if (current >= questions.length) {
      return <View style={styles.container}></View>
    }

    const intro_text = this.state.visible === 'question' ? 'Question:' : 'Answer:'

    const questions_remaining = questions.length - current

    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>{questions_remaining > 1 ? `${questions_remaining} questions remaining` : 'Last question!'}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.subtext}>{intro_text}</Text>
          <Text style={styles.text}>{questions[current][this.state.visible]}</Text>
        </View>
        <View style={styles.question}>
          <Button
            style={[styles.button]}
            color='black'
            onPress={this.showAnswer}
            title='Show answer'
            disabled={this.state.visible === 'answer'}
          />
        </View>
        <Button
          style={styles.button}
          color='green'
          onPress={this.correctAnswer}
          title='Correct'
        />
        <Button
          style={styles.button}
          color='red'
          onPress={this.incorrectAnswer}
          title='Incorrect'
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

export default connect(mapStateToProps)(DeckQuiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro: {
    marginBottom: 40,
  },
  introText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  info: {
    marginBottom: 100
  },
  question: {
    marginBottom: 30
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
    padding: 6,
    margin: 10,
  }
})

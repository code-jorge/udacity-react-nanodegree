import React, {Component}              from 'react'
import {View, Text}                    from 'react-native'
import {StyleSheet}                    from 'react-native'
import {TextInput, Platform}           from 'react-native'
import {connect}                       from 'react-redux'
import {NavigationActions}             from 'react-navigation'
import {addCardToDeck}                 from '../utils/api'
import {questionAdd}                   from '../actions'
import Button                          from './Button'

class CardAdd extends Component {

  state = {
    question: '',
    answer: '',
  }

  submit = ()=> {

    const {question, answer} = this.state

    this.props.addQuestion(this.props.navigation.state.params.deck, {question, answer})

    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add a new card to the deck</Text>
        <Text style={styles.label}>Question</Text>
        <TextInput
          style={[styles.input, Platform.OS === 'ios' ? styles.iosInput : {}]}
          onChangeText={(question) => this.setState({question})}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={[styles.input, Platform.OS === 'ios' ? styles.iosInput : {}]}
          onChangeText={(answer) => this.setState({answer})}
        />
        <Button
          style={styles.button}
          color='black'
          onPress={this.submit}
          title='Submit'
          disabled={this.state.question.trim() === '' || this.state.answer.trim() === '' || this.props.questions.indexOf(this.state.question.trim()) != -1}
        />
      </View>
    )
  }

}

function mapStateToProps({decks}, {navigation}) {
  const {deck} = navigation.state.params
  return {
    questions: decks[deck].questions.map(question=>question.question)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (title, card)=> addCardToDeck(title, card).then(()=> dispatch(questionAdd(title, card)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardAdd)

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
    textAlign: 'center',
    marginBottom: 40
  },
  input: {
    marginBottom: 20,
    marginTop: 10,
    width: 290,
    height: 60,
    padding: 8,
  },
  iosInput: {
    backgroundColor: '#ededed'
  },
  button: {
    marginTop: 15,
    padding: 6
  },
  label: {
    fontSize: 20,
    textAlign: 'center'
  }
})

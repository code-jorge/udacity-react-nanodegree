import React, {Component}                 from 'react'
import {connect}                          from 'react-redux'
import {Constants}                        from 'expo'
import {View, Platform, StatusBar}        from 'react-native'
import {TabNavigator, StackNavigator}     from 'react-navigation'
import {FontAwesome}                      from '@expo/vector-icons'
import {MaterialCommunityIcons}           from '@expo/vector-icons'
import DeckAdd                            from './DeckAdd'
import DeckList                           from './DeckList'
import DeckQuiz                           from './DeckQuiz'
import DeckData                           from './DeckData'
import CardAdd                            from './CardAdd'
import QuizResult                         from './QuizResult'
import {getDecks}                         from '../utils/api'
import {decksSet}                         from '../actions'
import {setLocalNotification}             from '../utils/notifications'


function MainStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor})=> <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  DeckAdd: {
    screen: DeckAdd,
    navigationOptions: {
      tabBarLabel: 'New deck',
      tabBarIcon: ({tintColor})=> <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS == 'ios' ? 'white' : 'black',
      shadowColor: 'rgba(0,0,0,.24)',
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckQuiz: {
    screen: DeckQuiz,
    title: 'Quiz',
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      }
    }
  },
  DeckData: {
    screen: DeckData,
    navigationOptions: ({navigation})=> ({
      title: `${navigation.state.params.deck}`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      }
    })
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      title: 'Add a card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      }
    }
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: {
      title: 'Quiz Results',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      }
    }
  }
})

class Content extends Component {

  componentDidMount() {
    getDecks()
      .then((decks={})=> {
        this.props.loadDecks(decks)
        return decks
      })

    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MainStatusBar backgroundColor={'black'} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDecks: decks=> dispatch(decksSet(decks)),
  }
}

export default connect(null, mapDispatchToProps)(Content)

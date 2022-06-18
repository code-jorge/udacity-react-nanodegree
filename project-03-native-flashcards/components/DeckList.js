import React, {Component}                 from 'react'
import {connect}                          from 'react-redux'
import {Constants}                        from 'expo'
import {View, Text, StyleSheet}           from 'react-native'
import {TouchableOpacity}                 from 'react-native'
import {FlatList}                         from 'react-native'
import {NavigationActions}                from 'react-navigation'

class DeckList extends Component {


  navigate = (deck)=> {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckData',
      params: {deck}
    }))
  }

  render() {

    const {decks} = this.props

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={decks}
          keyExtractor={item=>item.title}
          renderItem={({item})=> (
            <TouchableOpacity key={item.title} style={styles.deck} onPress={this.navigate.bind(this, item.title)}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.questions.length} cards</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

function mapStateToProps({decks}) {
  return {
    decks: Object.keys(decks || {}).map(key=>decks[key])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadDecks: decks=> dispatch(decksSet(decks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)

const styles = StyleSheet.create({
  deck: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 35,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  subtitle: {
    textAlign: 'center'
  }
})

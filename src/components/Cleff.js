import React, {Component} from 'react'
import {View} from 'react-native'

class Cleff extends Component {
  render() {
    const {height, width} = this.props
    let spaces = [0,1,2,3]
    return (
      <View
        style={{height, width, borderWidth: 1, display: 'flex', flexDirection: 'column'}}
      >
      {
        spaces.map(space =>
          <View key={space} style={{flex: (1/spaces.length), width, borderTopWidth: 0.5, borderBottomWidth: 0.5}} />
        )
      }
      </View>
    )
  }
}

export default Cleff
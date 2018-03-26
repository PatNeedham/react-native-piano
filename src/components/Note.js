import React, {Component} from 'react'
import {View} from 'react-native'

class Note extends Component {
  render() {
    const {height, width} = this.props
    return (
      <View style={{height, width, borderRightWidth: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <View
          style={{width, height: 20, borderRadius: 7, backgroundColor: 'black'}}
          transform={[{ skewX: '45deg' }]}
        />
      </View>
    )
  }
}

export default Note
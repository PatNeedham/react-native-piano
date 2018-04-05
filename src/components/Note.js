import React, {Component} from 'react'
import {View, TouchableHighlight} from 'react-native'

const keys = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
//            -30  -25  -20  -15  -10

function getHeightOffset(note) {
  if (!note) {
    // default to 0
    return 0
  } else {
    let index = keys.indexOf(note)
    return (-30 + (index * 13))
  }
}

class Note extends Component {
  state = {
    pressed: false
  }
  render() {
    const {height, width, note} = this.props
    let bottom = getHeightOffset(note)
    let backgroundColor = this.state.pressed ? 'red' : 'black'
    return (
      <TouchableHighlight
        style={{height, width, bottom, borderRightWidth: 2, borderRightColor: backgroundColor, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}
        onPress={() => {}}
        onShowUnderlay={() => {
          this.setState({pressed: true})
        }}
        onHideUnderlay={() => {
          this.setState({pressed: false})
        }}
        underlayColor="rgba(255, 255, 255, 0.2)"
      >
        <View
          style={{width, height: 20, borderRadius: 7, backgroundColor}}
          // transform={[{ skewX: '45deg' }]}
        />
      </TouchableHighlight>
    )
  }
}

export default Note
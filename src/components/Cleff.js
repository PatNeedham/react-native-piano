import React, {Component} from 'react'
import {View, Image} from 'react-native'
import Note from './Note'
const trebleImg = require('../images/219px-GClef.svg.png')
const bassImg = require('../images/FClef.svg.png')

class Cleff extends Component {
  renderNotes = (imageWidth) => {
    const {notes, height, width} = this.props
    if (notes) {
      return (
        <View style={{position: 'absolute', left: (imageWidth + 30), width: width - (imageWidth + 30), top: 0, bottom: 0, height, display: 'flex', flexDirection: 'row'}}>
          {
            notes.map((note, index) =>
              <View key={`_${index}_${note}`}
                style={{flex: 1 / notes.length}}>
                <Note height={height} width={40} />
              </View>
            )
          }
        </View>
      )
    }
  }
  render() {
    const {height, width, type} = this.props
    let spaces = [0,1,2,3]
    const image = type == 'treble' ? trebleImg : bassImg
    const imageHeight = type == 'treble' ? height + 30 : height - 10
    const imageWidth = type == 'treble' ? 40 : 50
    const top = type == 'treble' ? -15 : 0
    const imageStyle = {
      position: 'absolute',
      left: 10,
      top,
      height: imageHeight,
      width: imageWidth,
      resizeMode: 'contain'
    }
    return (
      <View
        style={{height, width, borderWidth: 1, display: 'flex', flexDirection: 'column'}}
      >
        {
          spaces.map(space =>
            <View key={space} style={{flex: (1/spaces.length), width, borderTopWidth: 0.5, borderBottomWidth: 0.5}} />
          )
        }
        {this.renderNotes(imageWidth)}
        <Image style={imageStyle} source={image} />
      </View>
    )
  }
}

export default Cleff
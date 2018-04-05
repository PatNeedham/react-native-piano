import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  AppState
} from 'react-native'
import Staff from './src/components/Staff'
import Permissions from 'react-native-permissions'
const {width, height} = Dimensions.get('window')

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifPermissionStatus: null,
      appState: AppState.currentState
    }
  }
  componentDidMount() {
    let canOpen = Permissions.canOpenSettings()
    // console.warn('canOpen: ' + JSON.stringify(canOpen, null, 2))
    this.checkThePermissions()
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkThePermissions()
    }
    this.setState({appState: nextAppState})
  }
  requestThePermission = () => {
    Permissions.request('notification', { type: ['alert', 'badge'] }).then(resp => {
      // console.warn('users resposne: ' + JSON.stringify(resp, null, 2))
      setTimeout(() => {
        this.checkThePermissions()
      }, 300)
    })
  }
  checkThePermissions = () => {
    Permissions.check('notification').then(response => {
      this.setState({notifPermissionStatus: response})
    })
  }
  renderPermissionArea = () => {
    const {notifPermissionStatus} = this.state
    const theStyle = {
      padding: 15,
      bottom: 30
    }
    if (notifPermissionStatus == 'undetermined') {
      return (
        <View style={theStyle}>
          <TouchableHighlight
            underlayColor="lightgray"
            style={{backgroundColor: 'lightgray', padding: 10}}
            onPress={this.requestThePermission}>
            <Text>Allow Push notifications</Text>
          </TouchableHighlight>
        </View>
      )
    } else if (notifPermissionStatus == 'authorized') {
      return (
        <View style={theStyle}>
          <Text>You have allowed push notifications!</Text>
        </View>
      )
    } else {
      return (
        <View style={theStyle}>
          <Text>You do not have push notifications enabled</Text>
          <TouchableHighlight
            underlayColor="lightgray"
            style={{backgroundColor: 'lightgray', padding: 10}}
            onPress={() => {
              Permissions.openSettings()
            }}
          >
            <Text>Open them now!</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderPermissionArea()}
        <Staff height={height * 0.6} width={width * 0.8} both />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

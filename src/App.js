import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import config from './config/api.json';
import AuthorizedApp from './components/AuthorizedApp/AuthorizedApp';
import styles from './App.styles';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }
  
  onNavigationStateChange(navEvent) {
    const url = navEvent.url;
    const match = url.match(/\/#access_token=(.*)$/);
    const accessToken = match && match[1];
    if (accessToken) {
      this.setState(state => ({
        ...state,
        accessToken,
      }));
      // console.log('Signed in!');
    }
  }

  render() {
    if (this.state.accessToken) {
      return (
        <View style={styles.statusBarContainer}>
          <View style={styles.container}>
            <AuthorizedApp accessToken={this.state.accessToken} />
          </View>
        </View>
      );
    }

    const clientId = config.clientId;
    const redirectURI = 'http://heyalex.xyz';
    const responseType = 'token';
    return (
      <View style={styles.statusBarContainer}>
        <WebView
          source={{uri: `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`}}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
}

export default App;

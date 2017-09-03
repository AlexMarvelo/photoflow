import React, { Component } from 'react';
import config from './config/api.json';
import AuthorizedApp from './components/AuthorizedApp/AuthorizedApp';
import PersistentStorege from './utils/PersistentStorage';
import styles from './App.styles';


const storage = new PersistentStorege();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.auth();
  }

  auth() {
    let accessToken = storage.get('accessToken');
    if (!accessToken) {
      const locationHash = window.location.hash;
      const match = locationHash.match(/^#access_token=(.*)/);
      accessToken = match && match[1];
      if (accessToken) {
        storage.save('accessToken', accessToken);
      }
    }
    if (accessToken) {
      this.setState(state => ({
        ...state,
        accessToken,
      }));
      window.location.hash = '';
    } else {
      const clientId = config.clientId;
      const redirectURI = 'http://localhost:3000';
      const responseType = 'token';
      window.location.replace(`https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}`);
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {this.state.accessToken ? (
          <AuthorizedApp accessToken={this.state.accessToken} />
        ) : (
          <span style={styles.loader}>Authentication...</span>
        )}
      </div>
    );
  }
}

export default App;

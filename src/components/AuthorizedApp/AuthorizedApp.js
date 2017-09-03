import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Navbar from '../Navbar/Navbar';
import PostList from '../PostList/PostList';
import styles from './AuthorizedApp.styles';


const AuthorizedApp = ({ accessToken }) => (
  <View style={styles.container}>
    <Navbar accessToken={accessToken} />
    <PostList accessToken={accessToken} />
  </View>
);

const { string } = PropTypes;
AuthorizedApp.propTypes = {
  accessToken: string.isRequired,
};

export default AuthorizedApp;

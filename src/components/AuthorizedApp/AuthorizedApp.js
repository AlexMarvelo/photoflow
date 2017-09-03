import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import PostList from '../PostList/PostList';
import styles from './AuthorizedApp.styles';


const AuthorizedApp = ({ accessToken }) => (
  <div style={styles.container}>
    <Navbar accessToken={accessToken} />
    <PostList accessToken={accessToken} />
  </div>
);

const { string } = PropTypes;
AuthorizedApp.propTypes = {
  accessToken: string.isRequired,
};

export default AuthorizedApp;

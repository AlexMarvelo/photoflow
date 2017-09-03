import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, FlatList } from 'react-native';
import { apiHost } from '../../config/api.json';
import request from '../../utils/http';
import styles from './PostList.styles';


class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      nextUrl: null,
      loading: false,
    };
    this.config = {
      count: 6,
    };
    this.loadPosts = this.loadPosts.bind(this);
  }
  
  loadPosts() {
    this.setState(state => ({
      ...state,
      loading: true,
    }));
    request(this.state.nextUrl ?
      this.state.nextUrl :
      `${apiHost}/users/self/media/recent/?access_token=${this.props.accessToken}&count=${this.config.count}`
    )
      .then((data) => {
        this.setState(state => ({
          ...state,
          posts: state.posts.concat(data.data),
          nextUrl: data.pagination.next_url,
          loading: false,
        }));
      })
      .catch(err => {
        this.setState(state => ({
          ...state,
          loading: false,
        }));
        throw err;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          renderItem={(post => post.type === 'image' && (
            <View style={styles.post} key={post.id}>
              <Image
                source={{ uri: post.images.standard_resolution.url}}
                style={{
                  width: post.images.standard_resolution.width,
                  height: post.images.standard_resolution.height,
                }}
              />
            </View>
          ))}
        />
        {this.state.loading ? (
          <Text style={styles.loader}>Loading...</Text>
        ) : (
          <Button onPress={this.loadPosts} style={styles.button} text="Load posts" />
        )}
      </View>
    );
  }
}

const { string } = PropTypes;
PostList.propTypes = {
  accessToken: string.isRequired,
};

export default PostList;

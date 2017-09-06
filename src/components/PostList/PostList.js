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
    this.measureView = this.measureView.bind(this);
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
        // console.log(this.state.posts);
      });
  }
  
  measureView(event) {
    this.setState(state => ({
      ...state,
      viewWidth: event.layout.width,
    }));
  }

  render() {
    return (
      <View style={styles.container} onLayout={e => this.measureView(e.nativeEvent)}>
        <FlatList
          data={this.state.posts}
          style={styles.list}
          keyExtractor={post => post.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image
                source={{ uri: item.images.standard_resolution.url }}
                style={{
                  width: this.state.viewWidth,
                  height: this.state.viewWidth,
                }}
              />
            </View>
          )}
        />
        {this.state.loading ? (
          <Text style={styles.loader}>Loading...</Text>
        ) : (
          <Button onPress={this.loadPosts} style={styles.button} title="Load posts" />
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

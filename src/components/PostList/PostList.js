import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
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
      <div style={styles.container}>
        <ul style={styles.list}>
          {this.state.posts.map(post => post.type === 'image' && (
            <li style={styles.post} key={post.id}>
              <img
                src={post.images.standard_resolution.url}
                width={post.images.standard_resolution.width}
                height={post.images.standard_resolution.height}
                alt={post.id}
              />
            </li>
          ))}
        </ul>
        {this.state.loading ? (
          <span style={styles.loader}>Loading...</span>
        ) : (
          <Button onClick={this.loadPosts} style={styles.button} text="Load posts" />
        )}
      </div>
    );
  }
}

const { string } = PropTypes;
PostList.propTypes = {
  accessToken: string.isRequired,
};

export default PostList;

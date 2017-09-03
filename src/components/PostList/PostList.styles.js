import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 640,
    margin: '0 auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    // listStyle: 'none',
  },
  post: {
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 40,
    lineHeight: 40,
    backgroundColor: '#7ad4f7',
    fontFamily: 'helvetica,sans-serif',
    fontSize: 15,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    // cursor: 'pointer',
    // outline: 'none',
  },
  loader: {
    display: 'flex',
    width: '100%',
    height: 40,
    lineHeight: 40,
    fontFamily: 'helvetica,sans-serif',
    fontSize: 15,
  }
});

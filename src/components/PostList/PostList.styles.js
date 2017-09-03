export const Constants = {
  POST_WIDTH: 640,
};

const styles = {
  container: {
    width: Constants.POST_WIDTH,
    margin: '0 auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  post: {
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 40,
    lineheight: 40,
    background: '#7ad4f7',
    fontFamily: 'helvetica,sans-serif',
    fontSize: 15,
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    outline: 'none',
  },
  loader: {
    display: 'inline-block',
    width: '100%',
    height: 40,
    lineHeight: '40px',
    fontFamily: 'helvetica,sans-serif',
    fontSize: 15,
    background: 'none',
  }
};

export default styles;

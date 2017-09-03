import React from 'react';
import PropTypes from 'prop-types';


const Button = ({ text, onClick, ...otherProps }) => (
  <button onClick={onClick} {...otherProps}>{text}</button>
);

const { string, func } = PropTypes;
Button.propTypes = {
  text: string.isRequired,
  onClick: func
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;

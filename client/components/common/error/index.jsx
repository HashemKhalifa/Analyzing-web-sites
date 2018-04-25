import React from 'react';
import PropTypes from 'prop-types';

const ErrorMsg = props => <div className="error center">{props.title}</div>;

ErrorMsg.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ErrorMsg;

import React from 'react';
import PropTypes from 'prop-types';
import './search-result.css';

const SearchResult = (props) => {
  return (
    <div className="search_result">
      <ul>
        <li><span>HTML Version: </span>{props.htmlVersion}</li>
        <li><span>Title:</span> {props.meta.title}</li>
        <li><span>Description:</span> {props.meta.description}</li>
        <li><span>Website URL:</span> {props.url}</li>
        <li><span>Domain:</span> {props.domain}</li>
        <li><span>Internal Links:</span> {props.links.internalLinks}</li>
        <li><span>External Links:</span> {props.links.externalLinks}</li>
        <li><span>H1: </span>{props.heads.h1}</li>
        <li><span>H2:</span>{props.heads.h2}</li>
        <li><span>H3:</span> {props.heads.h3}</li>
        <li><span>H4:</span> {props.heads.h4}</li>
        {props.isLoginFormExist && <li><span>This page contain login form</span></li>}
      </ul>
    </div>
  );
};

SearchResult.propTypes = {
  htmlVersion: PropTypes.string,
  description: PropTypes.string,
  domain: PropTypes.string.isRequired,
  url: PropTypes.string,
  meta: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  heads: PropTypes.shape({
    h1: PropTypes.number,
    h2: PropTypes.number,
    h3: PropTypes.number,
    h4: PropTypes.number,
  }),
  links: PropTypes.shape({
    internalLinks: PropTypes.number,
    externalLinks: PropTypes.number,
  }),
  isLoginFormExist: PropTypes.bool.isRequired,
};
export default SearchResult;

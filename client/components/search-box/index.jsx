import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import SearchResult from '../search-result';
import { SEARCH_ENDPOINT } from '../../constants';
import ErrorMsg from '../common/error';

import './seach-box.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchResult: null,
      loading: false,
      isError: false,
      isResponseFailed: false,
    };
  }

  /**
   *
   * @param event
   */
  handleInputChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  /**
   *
   * @param e
   */
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleButtonOnClick();
    }
  };

  validateUrl = url => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);

  /**
   * @description handle button click and data request.
   */
  handleButtonOnClick = () => {
    // format url from here
    if (this.validateUrl(this.state.search)) {
      this.setState({
        loading: true,
        isError: false,
        isResponseFailed: false,
      });
      fetch(`${SEARCH_ENDPOINT}${this.state.search}`)
        .then(response => response.json())
        .then((response) => {
          if (response.error) {
            this.setState({
              isResponseFailed: true,
            });

            console.log('error');
          }
          this.setState({
            loading: false,
            isError: false,
            searchResult: response,
          });
        })
        .catch(() => {
          this.setState({
            isResponseFailed: true,
          });
        });
    } else {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const {
      searchResult, loading, isError, isResponseFailed,
    } = this.state;
    const style = {
      cursor: 'pointer',
    };
    return (
      <div className="search_container">
        <input
          placeholder="http://www.bayt.com"
          className="search_input"
          onKeyPress={this.handleKeyPress}
          onChange={this.handleInputChange}
          value={this.state.search}
          type="text" />

        <FontAwesomeIcon style={style} onClick={this.handleButtonOnClick} className="search_icon" icon={faSearch} />
        {loading &&
        <div className="center">Loading..
          <FontAwesomeIcon
            className="fa-spin"
            icon={faSpinner} />
        </div>}

        {isError && <ErrorMsg
          title="Please enter a valid URL" />}

        {isResponseFailed && <ErrorMsg
          title="Something went wrong please try again!" />}

        {searchResult && !searchResult.error &&
        <SearchResult
          {...searchResult} />}
      </div>
    );
  }
}

SearchBox.propTypes = {};

export default SearchBox;

import React, { Component } from "react";
import { hot } from "react-hot-loader";
import SearchBox from "./components/search-box";

class App extends Component {
  render() {
    return <SearchBox />;
  }
}

export default hot(module)(App);

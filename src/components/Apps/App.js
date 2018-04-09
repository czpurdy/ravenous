import React from 'react';
import './App.css';

import BusinessList from "../BusinessList/BusinessList.js";
import SearchBar from "../SearchBar/SearchBar.js";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js';

import Yelp from "../../util/Yelp.js"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: [],
      loading: false,
    };

    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    this.setState({ loading: true }, () => {
      Yelp.search(term, location, sortBy).then(businesses => {
        this.setState({
          loading: false, 
          businesses : businesses
        });
      });
    });
  }

  render() {
    const { businesses, loading } = this.state;

    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        {loading ? <LoadingSpinner/> : <BusinessList businesses={businesses} />}
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";

class Search extends Component {
  state = {
    query: "",
  };

  handleKey = (e) => {
    if (e.key === "Enter") {
      this.props.searchAdvice(this.state.query);
    }
  };

  render() {
    return (
      <div>
        <div className="search-interaction">
          <input
            className="search-bar"
            placeholder="Search"
            id="search"
            type="search"
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="search-button"
            onClick={() => this.props.searchAdvice(this.state.query)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export { Search };

import React from "react";
import { Component } from "react";
import { Search } from "../component/Search";
import { Images } from "../component/Images";

class Main extends Component {
  state = {
    slips: [],
    error: null,
    loading: true,
  };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    fetch("https://api.adviceslip.com/advice", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ slips: [data.slip], loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  searchAdvice = (query = "") => {
    this.setState({ loading: true });
    fetch(`https://api.adviceslip.com/advice/search/${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.slips && data.slips.length > 0) {
          this.setState({ slips: data.slips, error: null, loading: false });
        } else {
          this.setState({
            slips: [],
            error:
              "We searched really hard, but found nothing! Your advice is to not be discouraged and try again with another word!",
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  render() {
    const { error, slips, loading } = this.state;

    if (loading) {
      return (
        <div>
          <div className="search-container">
            <h3>SEARCH FOR YOUR OWN VERY SPECIAL ADVICE!</h3>
            <Search searchAdvice={this.searchAdvice} />
          </div>
          <h2>Loading...</h2>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <div className="search-container">
            <h3>SEARCH FOR YOUR OWN VERY SPECIAL ADVICE!</h3>
            <Search searchAdvice={this.searchAdvice} />
          </div>
          <h2>{error}</h2>
          <Images />
        </div>
      );
    } else {
      return (
        <div>
          <div className="search-container">
            <h3>SEARCH FOR YOUR OWN VERY SPECIAL ADVICE!</h3>
            <Search searchAdvice={this.searchAdvice} />
          </div>

          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <div className="advices-container">
                <span>
                  <h2>
                    {slips.length > 1 ? "YOUR ADVICES..." : "YOUR ADVICE..."}
                  </h2>
                </span>
                {slips.length > 0 ? (
                  slips.slice(0, 3).map((slip) => (
                    <div className="advice-container" key={slip.id}>
                      <p className="advice-text">{slip.advice}</p>
                    </div>
                  ))
                ) : (
                  <p className="advice-text">
                    We searched really hard, but found nothing! Your advice is
                    to not be discouraged and try again with another word!
                  </p>
                )}
              </div>
            </>
          )}
          <Images />
        </div>
      );
    }
  }
}

export { Main };

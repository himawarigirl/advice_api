import React, { Component } from "react";
import img1 from "./img/1.gif";
import img2 from "./img/3.gif";

class Images extends Component {
  state = {
    images: [img1, img2],
    currentImage: img1,
  };

  componentDidMount() {
    this.getRandomImage();
  }

  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.state.images.length);
    this.setState({ currentImage: this.state.images[randomIndex] });
  }

  render() {
    return (
      <div className="gif-container">
        <div className="gif-wrapper">
          <img src={this.state.currentImage} className="gif-content" />
        </div>
      </div>
    );
  }
}

export { Images };

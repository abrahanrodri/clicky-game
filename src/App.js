import React, { Component } from 'react';
// import logo from './logo.svg';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import './App.css';

class App extends Component {
  state = {
    friends,
    array: [],
    topScore: 0,
    score: 0,
    message: "",
    // shake: "false"
  };
  clickPicture = id => {
    const shuffledArray = this.shuffleArray(friends);
    this.setState({ friends: shuffledArray });

    if (this.state.array.includes(id)) {
      this.setState({
        score: 0,
        array: [],
        message: "Wrong! Click an image to start over!",
      });
    } else {
      this.setState({
        array: this.state.array.concat([id]),
        score: this.state.score + 1,
        message: "Correct! Keep going!",
      });
    }

    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
  };

  shuffleArray = picturesArray => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [
        picturesArray[j],
        picturesArray[i]
      ];
    }
    return picturesArray;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            CARTOON NETWORK CLICKY GAME
          </h1>
        </header>
        <h3 className="App-intro">
          <strong>
            Click a different image each time to earn a point. Click the same
            image twice in a row and you lose!
          </strong>
          <p className="score">
            <strong>
              Score: {this.state.score} | TopScore: {this.state.topScore}
            </strong>
          </p>
          <p className="message">
            <strong>{this.state.message}</strong>
          </p>
        </h3>
        <Wrapper
          pictures={this.state.friends.map(picture => (
            <Card
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
      </div>
    );
  }
}
export default App;
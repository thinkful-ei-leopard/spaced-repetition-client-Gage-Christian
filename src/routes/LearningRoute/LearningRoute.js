import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'

class LearningRoute extends Component {
  static contextType = UserContext
  state = {
    error: null,
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0
  }

  componentDidMount = () => {
    LanguageService.getHead()
      .then(obj => {
        console.log(obj)
        this.setState({
          nextWord: obj.nextWord,
          wordCorrectCount: obj.wordCorrectCount,
          wordIncorrectCount: obj.wordIncorrectCount,
          totalScore: obj.totalScore
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          error: e
        })
      })
  }
  
  render() {
    return (
      <section>
        <main>
          <h2>Translate the word:</h2>
          <span>{this.state.nextWord}</span> 
          <form>
            <label htmlFor='learn-guess-input'>
              What's the translation for this word? 
            </label>
            <input type='text' required id='learn-guess-input' />
            <button type='submit'>Submit your answer</button>
          </form>
          You have answered this word correctly {this.state.wordCorrectCount} times.
          You have answered this word incorrectly {this.state.wordIncorrectCount} times.
        </main>
        <p>Your total score is: {this.state.totalScore}</p>
        </section>
    );
  }
}

export default LearningRoute

/**
 * @criteria
  When viewing the learning page as a logged in user:
  - The app gets my next word to learn details from the server
  - I'm shown the word to learn
  - I'm shown my current total score
  - I'm shown the number of correct and incorrect guesses for that word
  - I'm presented an input to type my answer/guess for the current words translation
*/
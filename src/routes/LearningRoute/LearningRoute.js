import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = UserContext

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      currWord: '',
      correctAnswer: null,
      guessedCorrectly: null,
      guessGiven: null,
      lastWord: null,
      lastCorrect: null,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      totalScore: 0
    }
  }

  updateStateFromHead = () => {
    LanguageService.getHead()
      .then(obj => {
        console.log(obj)
        this.setState({
          currWord: obj.currWord,
          correctAnswer: obj.correctAnswer,
          wordCorrectCount: obj.wordCorrectCount,
          wordIncorrectCount: obj.wordIncorrectCount,
          totalScore: obj.totalScore
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error
        })
      })
  }

  componentDidMount = async () => {
    this.updateStateFromHead()
  }

  generateDisplayFeedback = (guess = this.state.guessGiven, word = this.state.lastWord, answer = this.state.lastCorrect) => {
    console.log(word, answer)
    if (guess === null) {
      return ""
    } else if (guess !== null) {
      return <p>The correct translation for {word} was {answer} and you chose {guess}!</p>
    }
  }

  generateCorrectIncorrectHeader = (correct = this.state.guessedCorrectly) => {
    if (correct === true) {
      return "You were correct! :D"
    } else if (correct === false) {
      return "Good try, but not quite right :("
    } else if (correct === null) {
      return "Translate the word:"
    }
  }

  nextHandler = async (e) => {
    await this.updateStateFromHead()
    // document.getElementById('learn-guess-input').value = ''
    this.setState({guessGiven : ''})
  }

  guessHandler = async (e) => {
    e.preventDefault();
    const guessGiven = document.getElementById('learn-guess-input').value.toLowerCase()
    const guessedCorrectly = guessGiven === this.state.correctAnswer ? true : false
    const lastCorrect = this.state.correctAnswer
    const lastWord = this.state.currWord
    await LanguageService.postGuess(guessGiven)
    this.setState({
      guessGiven,
      guessedCorrectly,
      lastCorrect,
      lastWord
    })   
  }
  
  changeGuessHandler = (e) => {
    this.setState({guessGiven : e.target.value})
  }

  render() {
    return (
      <section className='learning-route-container'>
        <main id='learning-route-main'> <p>{JSON.stringify(this.state).replace(/,/g, '\n')}</p>
          <h2 id='learning-route-header'>{this.generateCorrectIncorrectHeader()}</h2>
          <div className='DisplayFeedback'>{this.generateDisplayFeedback()}</div>
          <span className='learning-route-original'>{this.state.currWord}</span> 
          <form className='learning-route-form' onSubmit={this.guessHandler}>
            <label htmlFor='learn-guess-input' className='learning-route-label'>
              What's the translation for this word? 
            </label>
            <input type='text' required id='learn-guess-input' value={this.state.guessGiven} onChange={this.changeGuessHandler}/>
            <button type='submit'>Submit your answer</button>
          </form>
          You have answered this word correctly {this.state.wordCorrectCount} times.
          You have answered this word incorrectly {this.state.wordIncorrectCount} times.
          <div className='DisplayScore'>
            <p className='learning-route-total'>Your total score is: {this.state.totalScore}</p>
          </div>
        </main>
      </section>
    );
  }
}

export default LearningRoute

/**
 * @criteria
 After submitting an answer on the learning page as a logged in user:
- The app POSTs my answer for this word to the server
- The server will update my appropriate scores in the database
- After submitting, I get feedback whether I was correct or not
- After submitting, I'm told the correct answer
- My total score is updated
- I'm told how many times I was correct and incorrect for the word
- I can see a button to try another word
*/
import React, { Component } from 'react'
import config from '../../config';
import WordList from '../../components/Word/WordList'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'
import './DashboardRoute.css';

class DashboardRoute extends Component {
  static contextType = UserContext
  state = {
    error: null,
    words: [],
    language: {},
  }

  componentDidMount = () => {
    this.fetchWords()
      .then(obj => {
        console.log(obj)
        this.setState({
          words: obj.words,
          language: obj.language
        })
      })
  }

  fetchWords = () => {
    console.log(this.props)
    return (
      fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
      }
        else if (res === {
          "error": "Unauthorized request"
      }) {
          this.handleUnauthorizedRequest()
        }
        return Promise.reject('Error fetching language and words from server');
      })
      .catch(err => {
        this.setState({error: err})
      })
    )
  }

  handleUnauthorizedRequest = () => {
    this.props.history.push('/login')
    this.context.processLogout()
  }

  render() {
    return (
      <main id='dashboard-container'>
        <h2 className='dashboard-header'>Dashboard</h2>
        <section>
          <h2 className='dashboard-language'>Learn {this.state.language.name} Here!</h2>
          <Link to='/learn' className='practice-link'>Start practicing</Link>
          <WordList words={this.state.words} language={this.state.language}/>
        </section>
      </main>
    );
  }
}

export default DashboardRoute

import React from 'react'
import Word from './Word'


export default class WordsList extends React.Component {
    render() {

        return(
            <ul className='words-list-ul'>
                <h3>WORDS TO PRACTICE</h3>
                {this.props.words.map(word => <Word key={word.id} word={word}/>)}
                <span>Total correct answers: {this.props.language.total_score}</span>
            </ul>
        )
    }
}
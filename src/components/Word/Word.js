import React from 'react'

export default class Word extends React.Component {
    render() {
        return (
            <li className='words-list-item'>
                <div className='word'>
                <h4 className='original'>{this.props.word.original}</h4>
                <span className='word-span translation'>{this.props.word.translation}</span>
                </div>
                <div className='count'>
                <span className='word-span correct_count'>correct answer count: {this.props.word.correct_count}</span>
                <span className='word-span incorrect_count'>incorrect answer count: {this.props.word.incorrect_count}</span>
                </div>
            </li>
        )
    }
}
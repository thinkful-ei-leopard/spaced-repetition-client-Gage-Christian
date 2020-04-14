import React from 'react'

export default class Word extends React.Component {
    render() {
        return (
            <li>
                <div className='word'>
                <span className='original'>{this.props.word.original}</span>
                <span className='translation'>{this.props.word.translation}</span>
                </div>
                <div className='count'>
                <span className='correct_count'>correct answer count: {this.props.word.correct_count}</span><br></br>
                <span className='incorrect_count'>incorrect answer count: {this.props.word.incorrect_count}</span>
                </div>
            </li>
        )
    }
}
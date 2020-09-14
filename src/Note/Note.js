import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './Note.css';

class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = NotefulContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id


    fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
    })  
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error(error)
        });
}

    render() {
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                <button 
                    className='Note__delete' 
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    Delete Note
                </button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                        Date modified on 
                        {' '}
                        <span className='Date'>
                            {format(new Date(this.props.modified), 'Do MMM yyyy')}
                          
                        </span>
                    </div>
                </div>
            </div>
             
        )
    }
}

export default Note;
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Note.css';

class Note extends React.Component {
    render() {
        return (
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                <button className='Note__delete' type='button'>
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
import React from 'react';
/*import { Link } from 'react-router-dom'*/
import Note from '../Note/Note'
import './NoteListMain.css';

class NoteListMain extends React.Component {
    render() {
        return (
            <section className='NoteListMain'>
                <ul>
                    {this.props.notes.map(note =>
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                    )}
                </ul>
                <div className='NoteListMain__button-container'>
                    <p>insert button here</p>
                </div>
            </section>
        )
    }
}

/*NoteListMain.defaultProps = {
    notes: [],
}*/

export default NoteListMain;
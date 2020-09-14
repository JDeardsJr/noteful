import React from 'react';
/*import { Link } from 'react-router-dom'*/
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note'
import { getNotesForFolder } from '../notes-helpers';
import './NoteListMain.css';

class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext

    render() {
        const { notes=[] } = this.context;
        const { folderId } = this.props.match.params;
        const notesForFolder = getNotesForFolder(
            notes,
            folderId
        );
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
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
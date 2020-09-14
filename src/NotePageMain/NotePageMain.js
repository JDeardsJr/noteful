import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import { findNote } from '../notes-helpers';
import './NotePageMain.css';

class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        },
        /*note: {
            content: '',
        }*/
    }
    static contextType = NotefulContext

    handleDeleteNote = noteId => {
        this.props.history.push(`/`);
        console.log('`handleDeleteNote` ran');
    }
    
    render() {
        const { notes=[] } = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || { content: '' };
        return (
            <section className='NotePageMain'>
                <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}

/*NotePageMain.defaultProps = {
    note: {
      content: '',
    }
}*/

export default NotePageMain;
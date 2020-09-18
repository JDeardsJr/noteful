import React from 'react';
import NotefulContext from '../NotefulContext';
import Button from '../Button/Button';
import { findNote, findFolder } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteSidebar.css';

class NoteSidebar extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        const { notes, folders } = this.context;
        const {noteId} = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);
        return (
            <div className='NoteSidebar'>
                <Button
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NoteSidebar__back-button'
                >
                    Go back
                </Button>
                {folder && (
                    <h3 className='NoteSidebar__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

NoteSidebar.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
};

export default NoteSidebar;
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './MainSidebar.css';
import { countNotesForFolder } from '../notes-helpers';
import Button from '../Button/Button';

class MainSidebar extends React.Component {
    static contextType = NotefulContext;

    render() {
        return (
            <div className='MaindSidebar'>
                <ul className='MainSidebar__list'>
                    {this.context.folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='MainSidebar__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='MainSidebar__notes-filter'>
                                    {countNotesForFolder(this.context.notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='MainSideBar__button-wrapper'>
                    <Button
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='MainSidebar__add-folder-button'
                    >
                        Add folder
                    </Button>
                </div>
            </div>
        )
    }
}

export default MainSidebar;
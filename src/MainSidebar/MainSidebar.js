import React from 'react';
import { NavLink/*, Link*/ } from 'react-router-dom';
import './MainSidebar.css';
import { countNotesForFolder } from '../notes-helpers';

class MainSidebar extends React.Component {
    render() {
        return (
            <div className='MaindSidebar'>
                <ul className='MainSidebar__list'>
                    {this.props.folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='MainSidebar__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='MainSideBar__notes-filter'>
                                    {countNotesForFolder(this.props.notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default MainSidebar;
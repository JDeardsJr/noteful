import React from 'react';
import BackButton from '../BackButton/BackButton';
import './NoteSidebar.css';

class NoteSidebar extends React.Component {
    render() {
        return (
            <div className='NoteSidebar'>
                <BackButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NoteSidebar__back-button'
                >
                    Go back
                </BackButton>
                {this.props.folder && (
                    <h3 className='NoteSidebar__folder-name'>
                        {this.props.folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

/*NotePageNav.defaultProps = {
    history: {
        goBack: () => {}
    }
}*/

export default NoteSidebar;
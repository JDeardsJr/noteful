import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulContext from '../NotefulContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddNote.css';

class AddNote extends React.Component {
    static defaultProps = {
        history: {
            push: () => { }
        },
    }
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            name: {
                value: '',
                touched: false
            },
            content: {
                value: ''
            },
            folder: {
                value: ''
            }
        }
        /*this.nameInput = React.createRef();
        this.contentInput = React.createRef();*/
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updateContent(content) {
        this.setState({content: {value: content}});
    }

    updateFolder(folderId) {
        this.setState({ folder: {value: folderId}})
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, content, folder } = this.state;
        const newNote = {
            name: name.value,
            content: content.value,
            folderId: folder.value,
            modified: new Date()
        };

        this.setState({ error: null })

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    });
                }
                return res.json();
            })
            .then(data => {
                this.context.addNote(data);
                this.props.history.push(`/folder/${data.folderId}`)
            })
            .catch(error => {
                this.setState({ error })
            });
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    render() {
        return (
            <section className='AddNote'>
                <h2>Create a note</h2>
                <NotefulForm onSubmit={e => this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text'
                            className='AddNote__control'
                            name='name'
                            id='name'
                            onChange={e => this.updateName(e.target.value)}
                            //ref='this.nameInput'
                        />
                        {this.state.name.touched && (
                            <ValidationError message={this.validateName()} />
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='content'>Content</label>
                        <textarea 
                            type='text'
                            className='AddNote__control'
                            name='content'
                            id='content'
                            onChange={e => this.updateContent(e.target.value)}
                            //ref='this.contentInput'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='folder'>Folder</label>
                        <select
                            className='AddNote__control'
                            name='folder'
                            id='folder'
                            onChange={e => this.updateFolder(e.target.value)}
                            //ref='this.folderInput'
                        >
                            <option>Choose a folder...</option>
                            {this.context.folders.map((folder, i) => {
                                return <option key={i} value={folder.id}>{folder.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button
                            type='submit'
                            className='AddNote__button'
                            disabled={
                                this.validateName()
                            }
                        >
                            Add note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

export default AddNote;

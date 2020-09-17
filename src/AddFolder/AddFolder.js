import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import NotefulContext from '../NotefulContext';
import config from '../config';
import ValidationError from '../ValidationError';
import { v4 as uuidv4 } from 'uuid';
import './AddFolder.css'

class AddFolder extends React.Component {
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
                touched: false,
            }
        }
    }

    updateFolderName(name) {
        this.setState({name: { value: name, touched: true }});
    }
 
    handleSubmit(event) {
        event.preventDefault();
        const newFolder = {
            id: uuidv4(), 
            name: this.state.name.value
        };

        this.setState({ error: null })
        
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
                this.context.addFolder(data);
                this.props.history.push('/')
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
            <section className='AddFolder'>
                <h2>Create a folder</h2>
                <NotefulForm onSubmit={e => this.handleSubmit(e)}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text'
                            className='AddFolder__control'
                            name='name'
                            id='name'
                            onChange={(e) => this.updateFolderName(e.target.value)}
                        />
                        {this.state.name.touched && (
                            <ValidationError message={this.validateName()}/>
                        )}
                    </div>
                    <div className='AddFolder__button__group'>
                        <button
                            type='submit'
                            className='AddFolder__button'
                            disabled={
                                this.validateName()
                            }
                        >
                            Add folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }

}

export default AddFolder;
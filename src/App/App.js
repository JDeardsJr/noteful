import React from 'react';
import {Route, Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import MainSidebar from '../MainSidebar/MainSidebar';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotefulError from '../NotefulError';
import config from '../config';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => 
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      });
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => 
          <Route 
            exact
            key={path}
            path={path} 
            component={MainSidebar}
          />
        )}

        {['/note/:noteId', '/add-folder', '/add-note'].map(path =>
          <Route
            key={path}
            path={path}
            component={NoteSidebar}
          />
        )}
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route 
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}

        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />    
        <Route 
          path='/add-folder' 
          component={AddFolder} 
        />   
        <Route 
          path='/add-note' 
          component={AddNote} 
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className='App'>
          <nav className="App__nav">
            <NotefulError>
              {this.renderNavRoutes()}
            </NotefulError>
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className='App__main'>
            <NotefulError>
              {this.renderMainRoutes()}
            </NotefulError>
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
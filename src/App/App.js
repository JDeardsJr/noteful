import React from 'react';
import {Route, Link} from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import MainSidebar from '../MainSidebar/MainSidebar';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
//import dummyStore from '../dummy-store.js';
//import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import config from '../config';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

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
    //const {notes, folders} = this.state;
    return (
      <>
        <Route 
          exact
          path='/' 
          /*render={routeProps => (
              <MainSidebar
                folders={folders}
                notes={notes}
                {...routeProps} 
              />
          )}*/
          component={MainSidebar}
        />

        <Route 
          path='/folder/:folderId'
          /*render={routeProps => (
            <MainSidebar
              folders={folders}
              notes={notes}
              {...routeProps}
            />
          )}*/
          component={MainSidebar}
        />

        <Route
          path='/note/:noteId'
          /*render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NoteSidebar {...routeProps} folder={folder} />
          }}*/
          component={NoteSidebar}
        />
      </>
    );
  }

  renderMainRoutes() {
    //const {notes, folders} = this.state;
    return (
      <>
        <Route 
          exact
          path='/'
          /*render={routeProps => {
            const {folderId} = routeProps.match.params;
            const notesForFolder = getNotesForFolder(
              notes,
              folderId
            );
            return (
              <NoteListMain 
                {...routeProps}
                notes={notesForFolder}
              />
            );
          }}*/
          component={NoteListMain}
        />

        <Route 
          exact
          path='/folder/:folderId'
          /*render={routeProps => {
            const {folderId} = routeProps.match.params;
            const notesForFolder = getNotesForFolder(
              notes,
              folderId
            );
            return (
              <NoteListMain 
                {...routeProps}
                notes={notesForFolder}
              />
            );
          }}*/
          component={NoteListMain}
        />

        <Route
          path='/note/:noteId'
          /*render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />
          }}*/
          component={NotePageMain}
        />       
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className='App'>
          <nav className="App__nav">
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;

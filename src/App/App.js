import React from 'react';
import {Route, Link} from 'react-router-dom';
import MainSidebar from '../MainSidebar/MainSidebar';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store.js';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // fake data loading from API call
    this.setState(dummyStore)
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        <Route 
          exact
          path='/' 
          render={routeProps => (
              <MainSidebar
                folders={folders}
                notes={notes}
                {...routeProps} 
              />
          )}
        />

        <Route 
          path='/folder/:folderId'
          render={routeProps => (
            <MainSidebar
              folders={folders}
              notes={notes}
              {...routeProps}
            />
          )}
        />

        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NoteSidebar {...routeProps} folder={folder} />
          }}
        />
      </>
    );
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        <Route 
          exact
          path='/'
          render={routeProps => {
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
          }}
        />

        <Route 
          exact
          path='/folder/:folderId'
          render={routeProps => {
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
          }}
        />

        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />
          }}
        />       
      </>
    )
  }

  render() {
    return (
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
    );
  }
}

export default App;

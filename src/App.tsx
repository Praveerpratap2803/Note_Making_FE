import React from 'react';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'; 
import AddNote from './component/AddNote';
import LoginPage from './component/LoginPage';
import EditNote from './component/EditNote';
import NoteList from './component/NoteList';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/list" element={<NoteList/>}/>
          <Route path="/addNote" element={<AddNote/>}/>
          <Route path="/editNote/:id" element={<EditNote/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

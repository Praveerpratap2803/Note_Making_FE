import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'; 
import AddNote from './component/AddNote';
import LoginPage from './component/LoginPage';
import EditNote from './component/EditNote';
import NoteList from './component/NoteList';
import { UserId } from './component/userid';
function App() {
  let [user_id,setuser_id] = useState('')
  //const UserId = createContext(user_id);
  let updateContext = (user_id:string)=>{
    setuser_id(user_id)
  }
  return (
    <>
    <UserId.Provider value={{user_id,updateContext}}>
      {user_id}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/list" element={<NoteList/>}/>
          <Route path="/addNote" element={<AddNote/>}/>
          <Route path="/editNote/:id" element={<EditNote/>}/>
        </Routes>
      </BrowserRouter>
    </UserId.Provider>
    </>
  );
}

export default App;

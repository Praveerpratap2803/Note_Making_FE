import "./App.css";
import NoteList from "./NoteList";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
function App() {

  return (
    <>
      <Routes>
        <Route exact  path="/" Component={LoginPage}/>
        <Route exact path="/list" Component={NoteList}/>
        <Route path="/addNote" Component={AddNote}/>
        <Route path="/editNote/:id" Component={EditNote}/>
      </Routes>
      {/* <Link to="/addNote">Add Note</Link> */}
    </>
  );
}

export default App;

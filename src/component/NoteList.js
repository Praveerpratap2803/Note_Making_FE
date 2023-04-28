import NoteCard from "./NoteCard";
import axios from "axios";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

function NoteList(){
    const navigate = useNavigate();
    let [notes,setNote] = useState([]);
      useEffect(()=>{
        getAllNotesByUserId()
      },[])
      const getAllNotesByUserId = ()=>{
        axios.get('http://localhost:3000/getAllNotesByUserId/1')
        .then((res)=>{
          console.log(res.data);

          setNote(res.data.data);
        })
        .catch((e)=>console.log(e))
      }
    let deletedId = (id)=>{
        console.log("NoteList",id);
        axios.delete(`http://localhost:3000/deleteNote/${id}`)
        .then((res)=>{
            alert(`Note deleted`)
            getAllNotesByUserId()
        })
        .catch((e)=>alert('Note not deleted'))
    }
    let editFun = (id)=>{
        console.log("inside notelist edit function",id)
        navigate(`/editNote/${id}`);
    }
    let addClicked = ()=>{
        navigate('/addNote')
    }
    return (
        <>
            {/* <Link to="/addNote">Add Note</Link> */}
            <button onClick={()=>{addClicked()}}>Add Note</button>
            {notes.map((card)=>
                <NoteCard key={card.id} cardData={card} delete={deletedId} edit={editFun}/>
            )}
        </>
    )
}


export default NoteList;
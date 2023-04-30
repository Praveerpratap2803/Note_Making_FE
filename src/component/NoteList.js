import NoteCard from "./NoteCard";
import axios from "axios";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import DataService from "./userId";
function NoteList(){
  let user_id1 = DataService.getData()
  console.log(user_id1)
  let userId=user_id1;
    const navigate = useNavigate();
    let [notes,setNote] = useState([]);
      useEffect(()=>{
        getAllNotesByUserId()
      },[])
      const getAllNotesByUserId = ()=>{
        axios.get(`http://localhost:3000/getAllNotesByUserId/${userId}`)
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
    let getAllFavoriteNotesByUserId = ()=>{
      console.log()
      // let userId='1';
      axios.get(`http://localhost:3000/getAllFavoriteNotesByUserId/${userId}`).then((res)=>{
        console.log(res.data.data);
        setNote(res.data.data)
      })
    }
    let changedSelect = (e)=>{
      console.log(e.target.value);
      e.target.value==='1'?getAllNotesByUserId():getAllFavoriteNotesByUserId()
    }
    let loggedOut = ()=>{
      navigate('/')
    }
    return (
        <>
            <button onClick={()=>{addClicked()}}>Add Note</button>
            <select onChange={(e)=>{changedSelect(e)}} placeholder="Select the drop down">
              {/* <option selected >Open this select menu</option> */}
              <option value="1">All Notes</option>
              <option value="2">Favorite Notes</option>
            </select>
            <button onClick={loggedOut}>Log Out</button>
            {notes.map((card)=>
                <NoteCard key={card.id} cardData={card} delete={deletedId} edit={editFun} />
            )}
        </>
    )
}


export default NoteList;
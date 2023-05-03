import axios from "axios";
import { useState,useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";
import DataService from "./userid";
import note from "../interface";
function NoteList() {
    let userId = DataService.getData();
    let navigate = useNavigate()
    let [notes,setNote] = useState([])
    useEffect(()=>{
        getAllNotesByUserId()
    },[])
    const getAllNotesByUserId = ()=>{
        if(userId!==''){

        axios.get(`http://localhost:3000/getAllNotesByUserId/${userId}`)
        .then((res)=>{
          console.log(res.data);

          setNote(res.data.data);
        })
        .catch((e)=>console.log(e))

        }else{
            alert("Please login again")
        }
    }
    let getAllFavoriteNotesByUserId = ()=>{
        console.log()
        // let userId='1';
        axios.get(`http://localhost:3000/getAllFavoriteNotesByUserId/${userId}`).then((res)=>{
          console.log(res.data.data);
          setNote(res.data.data)
        })
      }
      let changedSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        e.target.value==='1'?getAllNotesByUserId():getAllFavoriteNotesByUserId()
      }
    let addClicked = ()=>{
        navigate('/addNote')
    }
    let loggedOut = ()=>{
        navigate('/')
    }
    let deletedId = (id:string)=>{
        console.log("NoteList",id);
        axios.delete(`http://localhost:3000/deleteNote/${id}`)
        .then((res)=>{
            alert(`Note deleted`)
            getAllNotesByUserId()
        })
        .catch((e)=>alert('Note not deleted'))
    }
    let editFun = (id:string)=>{
        console.log("inside notelist edit function",id)
        navigate(`/editNote/${id}`);
    }
  return (
    <>
        <button onClick={()=>addClicked()}>Add Note</button>
        <button onClick={loggedOut}>Log Out</button>
        <select onChange={(e)=>{changedSelect(e)}} placeholder="Select the drop down">
            <option value="1">All Notes</option>
            <option value="2">Favorite Notes</option>
        </select>
        {notes.map((card:note)=>
                <NoteCard key={card.id} cardData={card} delete={deletedId} edit={editFun} />
        )}
    </>
  );
}
export default NoteList;

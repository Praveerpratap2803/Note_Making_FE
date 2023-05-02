// import { Link } from "react-router-dom";
// import {NavLink} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import DataService from "./userId";

function AddNote() {
  let user_id=DataService.getData()
  let [message,setMessage]=useState({})
  const navigate = useNavigate();
  let clickedCancel = () => {
    navigate("/list");
  };
  let onFormSubmitted = (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setMessage({note_message:event.target[0].value});
    console.log("body for api",message)
    let dataForApi = {...message,user_id:user_id}
    console.log(dataForApi)
    createNote(dataForApi)
  };
  let createNote = (body)=>{
    console.log(body)
    let header = {
      'Authorization': localStorage.getItem("token")
    }
    console.log(header)
    axios.post(`http://localhost:3000/createNote`,body,{headers:header}).then((res)=>{
        console.log(res.body);
        alert("note created successfully")
        navigate("/list");
    }).catch((error)=>{
        alert(error)
    })
  }

  let messageChanged = (value)=>{
    console.log("value changed",value);
    setMessage({note_message:value})
  }
  return (
    <>
        <h1>Enter the message</h1>
      <form onSubmit={onFormSubmitted}>
        <label htmlFor="message">Enter the Message</label>
        <input type="text" name="message" value={message.note_message} onChange={(e)=>messageChanged(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => {clickedCancel()}}> Cancel </button>
    </>
  );
}
export default AddNote;

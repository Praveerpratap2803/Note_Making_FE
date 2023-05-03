import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataService from "./userid";
interface IAddNote{
    user_id: string;
    note_message: string;
}
function AddNote(){
    let user_id=DataService.getData()
    const navigate = useNavigate();
    let [message,setMessage]=useState({note_message:""});
    let clickedCancel = () => {
        navigate("/list");
    };
    let onFormSubmitted = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(message.note_message);
        setMessage({note_message:message.note_message});
        console.log("body for api",message.note_message)
        let dataForApi = {...message,user_id:user_id}
        console.log(dataForApi)
        createNote(dataForApi)
      };
      let createNote = (body:IAddNote)=>{
        console.log(body)
        let header = {
          'Authorization': localStorage.getItem("token")
        }
        console.log(header)
        axios.post(`http://localhost:3000/createNote`,body,{headers:header}).then((res)=>{
            alert("note created successfully")
            navigate("/list");
        }).catch((error)=>{
            alert(error)
        })
      }
    
      let messageChanged = (value:string)=>{
        console.log("value changed",value);
        setMessage({note_message:value})
      }

    return <>
        <h1>Enter the message</h1>
        <form onSubmit={onFormSubmitted}>
        <label htmlFor="message">Enter the Message</label>
        <input type="text" name="message" value={message.note_message} onChange={(e)=>messageChanged(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
        <button onClick={() => {clickedCancel()}}> Cancel </button>
    </>
}
export default AddNote
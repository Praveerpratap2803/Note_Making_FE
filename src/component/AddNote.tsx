import axios, { AxiosResponse } from "axios";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { UserId } from "./userid";
interface IAddNote{
    user_id: string;
    note_message: string;
}
interface IAddRes{
  "message": string,
  "data": {
      "id": string,
      "note_message": string,
      "favorite": string,
      "start_date": null|string,
      "end_date": null|string,
      "count_edit": number,
      "count_priority": number,
      "user_id": string,
      "created_by": null|string,
      "created_on": string,
      "modified_by": null|string,
      "modified_on": string,
      "deleted_by": null|string,
      "deleted_on": null|string
  }
}
function AddNote(){
    //using useContext for user id
    let {user_id} = useContext(UserId)

    // let user_id=DataService.getData()
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
        axios.post(`http://localhost:3000/createNote`,body,{headers:header}).then((res:AxiosResponse<IAddRes>)=>{
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
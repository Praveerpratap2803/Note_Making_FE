import axios, { AxiosResponse } from "axios"
import {useState,useEffect, ChangeEvent, FormEvent, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DataService, { UserId } from "./userid";
interface IGetNoteByIdRes{
    "message": string,
    "data": {
        "id": string,
        "note_message": string,
        "favorite": string,
        "user_id": string,
        "created_by": null|string,
        "created_on": string,
        "modified_by": null|string,
        "modified_on": string,
        "deleted_by": null|string,
        "deleted_on": null|string
    }
}
interface IUpdateNote{
    "message": "Note updated successfully",
    "data": {
        "id": string,
        "note_message": string,
        "favorite": string,
        "start_date": string|null,
        "end_date": string|null,
        "count_edit": number,
        "count_priority": number,
        "user_id": string,
        "created_by": null|string,
        "created_on": string,
        "modified_by": null|string,
        "modified_on": string|null,
        "deleted_by": null|string,
        "deleted_on": null|string
    }
}
function EditNote(){

    //using useContext for user id
    let {user_id} = useContext(UserId)

    // let user_id = DataService.getData();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname)
    let id = location.pathname.split('/')[2]
    let [message,setMessage]=useState({note_message:""});

    let getNoteById = async()=>{
        axios.get(`http://localhost:3000/getNoteById/${id}`).then((res:AxiosResponse<IGetNoteByIdRes>)=>{
            console.log(res.data.data)
            let {note_message} = res.data.data
            console.log(note_message)
            setMessage({note_message})
        })
        .catch((e)=>{
            console.log(e)
        })
        // try{
        // let data = await axios.get(`http://localhost:3000/getNoteById/${id}`);
        // console.log(data)
        // }catch(e){
        //     console.log(e);
        // }
    }
    let editFormChanged = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e);
        console.log(e.target.value);
        setMessage({note_message:e.target.value})
    }
    let editFormSubmitted = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(event)
        // console.log(e.target[0].value)
        //setMessage({note_message:e.target[0].value})
        let body = {
            note_message:message.note_message,
            "id":id,
            "user_id":user_id
        }
        axios.put(`http://localhost:3000/updateNote`,body).then((res:AxiosResponse<IUpdateNote>)=>{
            console.log(res)
            alert(res.data.data.note_message);
            navigate("/list");
        })
    }
    useEffect(()=>{
        getNoteById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let clickedCancelEdit = () =>{
        navigate('/list')
    }
    return <>
     <h1>Edit the message</h1>
        <form onSubmit={(e)=>editFormSubmitted(e)}>
            <label htmlFor="message">Enter the Message</label>
            <input type="text" name="message" value={message.note_message} onChange={(e)=>editFormChanged(e)}/>
            <button type="submit">Edit</button>
            <button onClick={clickedCancelEdit}>Cancel</button>
        </form>
    </>
}
export default EditNote
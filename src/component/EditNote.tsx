import axios from "axios"
import {useState,useEffect, ChangeEvent, FormEvent} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DataService from "./userid";

function EditNote(){
    let user_id = DataService.getData();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname)
    let id = location.pathname.split('/')[2]
    let [message,setMessage]=useState({note_message:""});

    let getNoteById = async()=>{
        axios.get(`http://localhost:3000/getNoteById/${id}`).then((res)=>{
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
        axios.put(`http://localhost:3000/updateNote`,body).then((res)=>{
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
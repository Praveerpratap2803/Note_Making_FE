import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState,useContext } from "react";
import note, { Priority1 } from "../interface"
import  { UserId } from "./userid";

interface INoteCard{
    cardData:note
    delete:(id:string)=>void
    edit:(id:string)=>void
}
function NoteCard(props:INoteCard){

    //using useContext for user id
    let {user_id} = useContext(UserId)

    let {cardData} = props;
    let formattedCreatedDate = cardData.created_on.split('T')[0];
    let [startValue,setStartValue] = useState(cardData.start_date)
    let [endValue,setEndValue] = useState(cardData.end_date)
    let [createdValue,setCreatedValue] = useState(formattedCreatedDate)
    let [fav,setFav] = useState(cardData.favorite);
    let [priorityValue,setPriorityValue] = useState('')
    let [fivePriorityList,setfivePriorityList] = useState<Priority1[]>([])
    
    let deleteFun = (id:string)=>{
        props.delete(id)
    }
    let editFun = (id:string)=>{
        props.edit(id) 
        console.log("inside NoteCard edit function",id)
    }
    let startDateSelected = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log("startSelected");
        let body = {
            note_message:cardData.note_message,
            user_id:user_id,
            id:cardData.id,
            start_date:e.target.value,
            // end_date:2023-01-01,
            created_on:cardData.created_on
        }
        setStartValue(e.target.value)
        console.log(body);
        axios.put(`http://localhost:3000/updateNote`,body).then((res)=>{
            console.log(res)
        })
    }
    let endDateSelected = (e:ChangeEvent<HTMLInputElement>)=>{
        let body = {
            note_message:cardData.note_message,
            user_id:user_id,
            id:cardData.id,
            // start_date:e.target.value,
            end_date:e.target.value,
            created_on:cardData.created_on
        }
        setEndValue(e.target.value)
        console.log(body);
        axios.put(`http://localhost:3000/updateNote`,body).then((res)=>{
            console.log(res)
        })
    }
    let createdDateSelected = (e:ChangeEvent<HTMLInputElement>)=>{
        let body = {
            note_message:cardData.note_message,
            user_id:user_id,
            id:cardData.id,
            // start_date:e.target.value,
            // end_date:e.target.value,
            created_on:e.target.value
        }
        setCreatedValue(e.target.value)
        console.log(body);
        axios.put(`http://localhost:3000/updateNote`,body).then((res)=>{
            console.log(res)
        })
    }
    useEffect(()=>{
        getPriorityByNoteId();
        getLastFivePrioritiesByNoteId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let getPriorityByNoteId = ()=>{
        console.log(cardData.id);
        axios.get(`http://localhost:3000/getPriorityByNoteId/${cardData.id}`).then((res)=>{
        // console.log(res.data.data);
            if(res.data?.data?.priority){
                setPriorityValue(res.data.data.priority);
            }
        })
    }
    let favorite1 = (id:string,favorite:"Yes"|"No")=>{
        let body = {id,favorite}
        if(body.favorite==='Yes'){
            body.favorite = 'No'
        }else{
            body.favorite = 'Yes'
        }
        console.log("body ",body)
        axios.put(`http://localhost:3000/updateFavouriteTagById`,body).then((res)=>{
            console.log(res.data)
            console.log(res.data.data.favorite)
            let favData = res.data.data.favorite
            setFav(favData)
        }).catch((error)=>{
            alert(error);
        })
    }
    let createPriority = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(e);
        console.log(priorityValue);
        // let priorityValue = new Number(priorityValue);
        let priorityValue1 = parseInt(priorityValue);
        let body = {
            note_id:cardData.id,
            priority:priorityValue1,
            user_id:user_id
        }
        console.log(body);
        axios.post(`http://localhost:3000/createPriority`,body).then((res)=>{
            if(!res.data.data){
                alert(res.data.message)
                return
            }
            console.log(res.data.data);
            setPriorityValue(res.data.data.priority);
            getLastFivePrioritiesByNoteId();
        })
    }
    let getLastFivePrioritiesByNoteId = ()=>{
        axios.get(`http://localhost:3000/getLastFivePrioritiesByNoteId/${cardData.id}`).then((res)=>{
            console.log(res.data.data);
            setfivePriorityList(res.data.data);
        })
    }
    let changedPriority = (e:ChangeEvent<HTMLInputElement>)=>{
        setPriorityValue(e.target.value)
    }
    return <>
            <div style={{border:"2px solid black",margin:"2px",padding:"4px", display: "flex",flexDirection: "column",gap: "10px",backgroundColor:'lightblue'}}>
            <div>Message -: {cardData.note_message}</div>
            <div style={{display:'flex',gap:"3px"}}>
                    <button onClick={()=>deleteFun(cardData.id)}>Delete</button>
                    <button onClick={()=>editFun(cardData.id)}>Edit</button>
                    <button onClick={()=>{favorite1(cardData.id,fav)}}>{fav==='Yes'?'Favourite':'Not Favourite'}</button>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>Start Date : <input type="date" name="" id="" value={startValue} onChange={(e)=>startDateSelected(e)}/>  </div>
                    <div>End Date : <input type="date" name="" id="" value={endValue} onChange={(e)=>endDateSelected(e)}/>  </div>
                    <div>Created Date : <input type="date" name="" id="" value={createdValue} onChange={(e)=>{console.log(e.target.value);createdDateSelected(e)}}/>  </div>
                    <div>count edited : {cardData.count_edit}</div>  
            </div>
            <div>Priority : 
                  <form action="" onSubmit={(e)=>{createPriority(e)}}>
                      <input style={{marginRight:'3px'}} type="number" min='1' name="priority" id="priority" value={priorityValue} onChange={(e)=>{changedPriority(e)}} />
                      <button type="submit">Submit Priority</button>
                  </form>
                  count priority updated - {cardData.count_priority},  
                  Last five Priority - {fivePriorityList.length?fivePriorityList.map((data)=>(<>{data.priority} </> )):""}
                </div>
            </div>
    </>
}
export default NoteCard
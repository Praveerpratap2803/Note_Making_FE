// import { Link } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

function NoteCard(props){
    let {cardData} = props;
    let [fav,setFav] = useState(cardData.favorite);
    let deleteFun = (id)=>{
        props.delete(id)
    }
    let editFun = (id)=>{
        props.edit(id) 
        console.log("inside NoteCard edit function",id)
    }

    let favorite1 = (id,favorite)=>{
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
    return (
        <>
            <div style={{border:"2px solid black",margin:"2px"}}>
                <div>{cardData.note_message}</div>
                <button onClick={()=>deleteFun(cardData.id)}>Delete</button>
                <button onClick={()=>editFun(cardData.id)}>Edit</button>
                <button onClick={()=>{favorite1(cardData.id,fav)}}>{fav==='Yes'?'Favourite':'Not Favourite'}</button>                
            </div>
        </>
    )

}

export default NoteCard;
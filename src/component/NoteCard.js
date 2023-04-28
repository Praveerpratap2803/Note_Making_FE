// import { Link } from "react-router-dom";

function NoteCard(props){
    console.log("in notecard",props)
    let {cardData} = props;
    let deleteFun = (id)=>{
        props.delete(id)
    }
    let editFun = (id)=>{
        props.edit(id) 
        console.log("inside NoteCard edit function",id)
        //return <Link to="/editNote">Edit Note</Link> 
    }
    return (
        <>
            <div style={{border:"2px solid black",margin:"2px"}}>
                <div>{cardData.note_message}</div>
                <button onClick={()=>deleteFun(cardData.id)}>Delete</button>
                <button onClick={()=>editFun(cardData.id)}>Edit</button>
            </div>
        </>
    )

}

export default NoteCard;
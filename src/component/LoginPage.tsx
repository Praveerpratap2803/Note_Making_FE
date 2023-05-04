import { ChangeEvent, FormEvent, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios, {  AxiosResponse } from "axios";
import  { UserId } from "./userid";
interface loginRes{
    "message": string,
    "data": {
        "token": string,
        "id": string,
        "username": string,
        "password": string,
        "first_name": string|null,
        "last_name": string|null,
        "created_by": string|null,
        "created_on": string,
        "modified_by": string|null,
        "modified_on": string|null,
        "deleted_by": string|null,
        "deleted_on": string|null
    }
}
function LoginPage(){

    
    const user_id = useContext(UserId) 
    
    
    let navigate = useNavigate()
    let [formData,setFormData] = useState({username:'',password:''})
    let formSubmitted = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formData);
        try{
            axios.post(`http://localhost:3000/login`,formData).then((res:AxiosResponse<loginRes>)=>{
                // console.log(res.data.data.id);
                if(res.status===200){
                    user_id.updateContext(res.data.data.id) 
                    //DataService.setData(res.data.data.id);
                    let token:string = res.data.data.token;
                    localStorage.setItem('token',token);
                    navigate('/list');
                }else{
                    console.log("wrong user");
                    alert("Enter Correct username and password")
                }
            })
        }catch(error){
            alert(error)
        }
    }
    let usernameChanged = (e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevEvent)=>({...prevEvent,username:e.target.value}))
    }
    let passwordChanged = (e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevEvent)=>({...prevEvent,password:e.target.value}))
    }
    return (
            <form action="" onSubmit={formSubmitted}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={(e)=>usernameChanged(e)}/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={(e)=>passwordChanged(e)}/>
                <button type="submit">Submit</button>                
            </form>
    )
}
export default LoginPage

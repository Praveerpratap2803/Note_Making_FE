import { ChangeEvent, FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataService from "./userid";

function LoginPage(){
    let navigate = useNavigate()
    let [formData,setFormData] = useState({username:'',password:''})
    let formSubmitted = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formData);
        try{
            axios.post(`http://localhost:3000/login`,formData).then((res)=>{
                console.log(res.data.data.id);
                if(res.status===200){
                    DataService.setData(res.data.data.id);
                    let token:string = res.data.data.token;
                    localStorage.setItem('token',token);
                    navigate('/list');
                }else{
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
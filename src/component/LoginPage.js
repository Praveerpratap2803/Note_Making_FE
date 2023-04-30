import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataService from "./userId";
function LoginPage(){
    let navigate = useNavigate();
    let formSubmitted = (e)=>{
        e.preventDefault();
        // console.log(e.target.username.value);
        // console.log(e.target.password.value);
        let formData = {
            username:e.target.username.value,
            password:e.target.password.value
        }
        console.log(formData)
        try{
        axios.post(`http://localhost:3000/login`,formData).then((res)=>{
            console.log(res.data);
            console.log(res.status);
            if(res.status===200){
                //props.allowed(true);
                //props.userId(res.data.id)
                console.log(res.data.data.id)
                DataService.setData(res.data.data.id);
                navigate('/list')
            }else{
                console.log("in else")
                alert("Enter Correct username and password")
            }
        })
        }catch(error){
            alert(error)
        }
    }
    return (
        <form action="" onSubmit={formSubmitted}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"/>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password"/>
            <button type="submit">Submit</button>
        </form>
    )
}
export default LoginPage;
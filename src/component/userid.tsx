import { createContext } from "react";

// import { useContext } from "react"
const UserId = createContext({user_id:'',updateContext:(id:string)=>{}});

//Not using this instead using context api
let DataService = {
    user_id:'',
    setData(data:string){
        this.user_id = data
    },
    getData(){
        return this.user_id
    }
}
export default DataService
export {UserId}
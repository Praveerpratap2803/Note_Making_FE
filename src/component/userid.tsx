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

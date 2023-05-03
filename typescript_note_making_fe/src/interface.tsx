type Favorite="Yes"|"No";
interface note{
    id:string;
    note_message:string;
    user_id:string;
    favorite:Favorite;
    start_date:string;
    end_date:string;
    count_edit:number;
    count_priority:number;
    created_on:string;
}
export interface Priority1{
    id:string;
    priority:number;
    note_id:string;
    user_id:string;
}
export default note;

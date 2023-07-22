import React,{useState} from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    
        const  state = {
            "name":"Robin",
            "class":"16"
        }
       
        

        return(
        <NoteContext.Provider value={{state}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
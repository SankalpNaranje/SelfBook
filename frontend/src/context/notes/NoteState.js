import React,{ useState }  from "react";
import NoteContext from "./NoteContext";

const NoteState =(props)=>{
    const host ="https://self-book-backend.vercel.app"
    const notesInitial = []
    const [notes ,setNotes] =useState(notesInitial)

      //Get All notes NOTE
        const getNote = async ()=>{
            //API CALLS
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET", 
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },

                //no need to give body because we are fetching the data.
                // body: JSON.stringify({title,description,tags}), 
              });
              const json = await response.json();
              console.log(json)
              setNotes(json)
              
        
        }

      //ADD A NOTE
      const addNote=async (title,description ,tags)=>{
            //API CALLS
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tags}), 
              });
              const json = await response.json();
              console.log(json)
              
            console.log("Adding a new Note")
            const note =json
            setNotes(notes.concat(note))
        }


      //DELETE A NOTE
      const deleteNote=async(id)=>{
        // //API CALLS - backend
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE", 
                headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
                },
                
            });
            const json = await response.json();
            console.log(json)

            
            console.log("Deleting the node with id"+id)
            //those element notes will stay whose id is not equal to the parameter id.
            const newNotes = notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
      }

      //EDIT A NOTE
      const editNote=async (id,title,description,tags)=>{
           //API CALLS
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT", 
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({title,description,tags}), 
              });

              const json = await response.json();
              console.log(json)

              // To create a copy of the notes.
              let newNote = JSON.parse(JSON.stringify(notes))
              //Logic to edit in client
              for(let index=0 ;index <newNote.length ;index++){
                  const element = newNote[index];
                  if(element._id === id){
                    newNote[index].title = title;
                    newNote[index].description = description;
                    newNote[index].tags = tags;
                    break;
                  }
              }
               setNotes(newNote)
      }

    return(

        <NoteContext.Provider value ={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
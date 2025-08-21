import React, { use, useContext, useEffect  } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./NoteIteam";
import AddNote from "./AddNote";

const Notes = () => {
 const context = useContext(NoteContext);
const { notes, getNotes} = context;
useEffect(() => {
getNotes(); // Fetch notes on component mount 
}, []); // Empty dependency array to run only once
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>You Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;

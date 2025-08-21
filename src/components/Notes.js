import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteIteam from "./NoteIteam";
import Noteiteam from "./NoteIteam";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteIteam key={note._id} note={note}/>
      })}
    </div>
  );
};

export default Notes;

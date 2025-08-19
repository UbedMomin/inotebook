import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // ✅ Initialize state properly
  // const s1 = {
  //   name: "Ubed",
  //   class: "5c",
  // };

  // const [state, setState] = useState(s1); // ✅ useState syntax

  // ✅ Proper update function
  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: "Updated Ubed",
  //       class: "10A",
  //     });
  //   }, 1000); // ✅ delay after 1 second
  // };

  const notesInitial = [
    {
        "_id": "68a18aeaabebbdb9459cdcc4",
        "user": "689eba9ab82d9f06557c42df",
        "title": "My Title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2025-08-17T07:55:22.884Z",
        "__v": 0
    },
    {
        "_id": "68a18aecabebbdb9459cdcc6",
        "user": "689eba9ab82d9f06557c42df",
        "title": "My Title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2025-08-17T07:55:24.503Z",
        "__v": 0
    },
    {
        "_id": "68a18aedabebbdb9459cdcc8",
        "user": "689eba9ab82d9f06557c42df",
        "title": "My Title",
        "description": "please wake up early",
        "tag": "personal",
        "date": "2025-08-17T07:55:25.761Z",
        "__v": 0
    }
]

const [notes, setNotes] = useState(notesInitial); // ✅ Initialize notes state
  return (
    // ✅ Pass both state & update function via context
  <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

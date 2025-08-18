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

  return (
    // ✅ Pass both state & update function via context
  <NoteContext.Provider value={{}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

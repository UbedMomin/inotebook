import React from "react";

const NoteItem = (props) => {
  const { note } = props;   // ✅ correct destructuring
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
    </div>
  );
};

export default NoteItem;     // ✅ consistent name

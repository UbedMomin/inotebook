import React from "react";

const NoteItem = (props) => {
  const { note } = props; // ✅ correct destructuring
  return (
    <div className="col-md-3 my-3">
      {" "}
      {/* ✅ consistent class name */}
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem; // ✅ consistent name

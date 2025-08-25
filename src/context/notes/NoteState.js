import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // ✅ FIX: Check if token exists before making API call
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      // ✅ FIX: Check if response is ok and handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();
      console.log(json);

      // ✅ FIX: Ensure json is always an array
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]); // fallback to empty array if API doesn't return array
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // ✅ FIX: Check if token exists before making API call
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/addnote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // ✅ FIX: Check if response is ok and handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();
      console.log(json);

      // ✅ FIX: Push the actual backend note object, not custom
      setNotes(notes.concat(json));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // ✅ FIX: Check if token exists before making API call
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      // ✅ FIX: Check if response is ok and handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // ✅ FIX: Check if token exists before making API call
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // ✅ FIX: Check if response is ok and handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const json = await response.json();
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
import React from "react";
import NoteCard from "./NoteCard";
import Loader from "./Loader";


function NotesContainer(props) {
    return (
        <div className="container pb-5 mb-5">
            <div className="row g-3">

                {props.isLoading && <Loader />}
                {props.notes.map((note) => <NoteCard key={note.id} note={note} color="green"/>)}

            </div>
        </div>
    );
}

export default NotesContainer;
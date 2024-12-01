import React from "react";
import Filter from "../components/Filter";
import NotesContainer from "../components/NotesContainer";


function HomePage(props) {
    return (
        <>
            <Filter handleFilter={props.handleFilter}/>
            <NotesContainer notes={props.notes} isLoading={props.isLoading}/>
        </>
    );
}

export default HomePage;
import React from "react";
import Filter from "../components/Filter";
import NotesContainer from "../components/NotesContainer";


function HomePage(props) {
    return (
        <>
            {(!props.isLoading && props.notes.length < 1) ? <h4 className='pt-5 text-center'> No results 😥 </h4> : <Filter handleFilter={props.handleFilter}/>}
            <NotesContainer notes={props.notes} isLoading={props.isLoading}/>
        </>
    );
}

export default HomePage;
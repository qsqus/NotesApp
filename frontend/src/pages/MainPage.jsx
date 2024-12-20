import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainPage(props) {

    return (
        <>
            <NavBar searchedText={props.searchedText} handleSearchText={props.handleSearchText} handleLogout={props.handleLogout}/>
            <ToastContainer position='bottom-right' />
            <Outlet />
        </>
    );
}

export default MainPage;
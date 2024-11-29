import React from "react"
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";

// ok
function NavBar(props) {
    return (
        <nav className="navbar" style={{ padding: '20px', backgroundColor: '#999797' }}>
            <div className="container d-flex justify-content-around">
                <Link className="navbar-brand" to="/">
                    <h4 className='fw-bold'>📋 Notes</h4>
                </Link>
                <div className="d-flex">
                    <div
                        className="input-group"
                        style={{ width: "500px", height: "40px" }}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            value={props.searchedText}
                            onChange={(event) => props.handleSearchText(event.target.value)}
                            style={{backgroundColor: '#dadada', border: '0px'}}
                        />
                        <button className="btn btn-primary" type="submit">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                <Link to="/new-note" style={{ textDecoration: "none" }}>
                    <button className="btn btn-primary">
                        <FiPlusSquare className="mb-1" style={{fontSize: "20px"}} /> &nbsp;New Note
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
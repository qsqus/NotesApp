import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { FiPlusSquare, FiLogOut } from "react-icons/fi";

function NavBar(props) {

    const navigate = useNavigate();

    const logout = async () => {
        const isSuccess = props.handleLogout();

        if (isSuccess) {
            navigate('/login');
        }
    }

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
                            style={{ backgroundColor: '#dadada', border: '0px' }}
                        />
                        <button className="btn btn-primary" type="submit">
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <div className='d-flex flex-row gap-4'>
                    <Link to="/new-note" style={{ textDecoration: "none" }}>
                        <button className="btn btn-primary">
                            <FiPlusSquare style={{ fontSize: "20px" }} />
                        </button>
                    </Link>

                    <button className='btn btn-danger' onClick={logout}>
                        <FiLogOut style={{ fontSize: "20px" }}/>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
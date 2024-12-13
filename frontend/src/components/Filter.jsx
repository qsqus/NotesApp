import React from "react";


function Filter(props) {
    return (
        <div className="container" style={{width: "500px", margin: "20px auto"}}>
            <select 
                className="form-select"
                style={{height: "50px", backgroundColor: '#dadada', border: '0px'}}
                onChange={(event) => {props.handleFilter(event.target.value)}}
            >
                <option value='' defaultValue>All</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="PERSONAL">PERSONAL</option>
                <option value="IMPORTANT">IMPORTANT</option>
            </select>
      </div>
    );
}

export default Filter
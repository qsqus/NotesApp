import React from "react";
import './styles/Modal.css'
import { useNavigate } from "react-router-dom";

function Modal(props) {
    const navigate = useNavigate();
    
    const handleDeleteNote = () => {
        props.deleteNote();
        props.toggleIsModalVisible();
        navigate('/');
    };

    return (
        <div className='confirmation-modal-overlay'>
            <div className='confirmation-modal'>
                <div className='confirmation-modal-content'>
                    <h2> Delete note </h2>
                    <p> Are you sure you want to delete this note? </p>
                    <span className='d-flex justify-content-center'>
                        <button className='btn btn-primary me-4' onClick={props.toggleIsModalVisible}> Cancel </button>
                        <button className='btn btn-danger' onClick={handleDeleteNote}> Delete </button>
                    </span>
                </div>
            </div>
        </div>
    );

}

export default Modal;
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import baseURL from '../api';
import Modal from '../components/Modal'

function NoteDetailsPage(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [note, setNote] = useState({});
    const {id} = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${baseURL}${id}`)
        .then((response) => {
            setNote(n => response.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }, [id]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);  
        return date.toLocaleString('en-GB', {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const toggleIsModalVisible = () => {
        setIsModalVisible(m => !m)
    };

    return (
        <>
            <div className='container pt-4'>
                <div className="container row pb-2">
                    <div className='col-6'>
                        <button className="btn btn-primary w-100 justify-content-center" 
                                onClick={()=>navigate(`/edit-note/${note.id}`)}
                        >
                            <FiEdit className="mb-1" style={{fontSize: "20px"}} /> &nbsp;Edit
                        </button>
                    </div>
                    <div className='col-6'>
                    <button className="btn btn-danger w-100 justify-content-center" 
                            onClick={toggleIsModalVisible}
                    >
                        <BiSolidTrashAlt className="mb-1" style={{fontSize: "20px"}} /> &nbsp;Delete
                    </button>
                    </div>
                </div>

                <div className='card shadow' style={{
                    border: '2px solid #a7a7a7',
                    borderRadius: '10px',
                }}
                >
                    <div className="card-header pb-0" style={{ borderBottom: '1px solid gray', backgroundColor: '#cdcdcd' }}>
                        <h5 className='card-title mb-0 fw-bold'> {note.title} </h5>
                        <div className='d-flex justify-content-between mb-1'>
                            <p className="note-date font-12 text-muted mb-0"> 
                                Last updated: {formatDate(note.updated_at)} 
                            </p>
                            <p className="text-muted mb-0">
                                Category: {note.category}
                            </p>
                        </div>
                    </div>
                    <div className='card-body' style={{ backgroundColor: '#dadada', borderRadius: '0 0 8px 8px' }}>
                        <p className="card-text" style={{margin: '0 auto', textAlign: 'justify', width: '95%', whiteSpace: 'pre-wrap'}}> 
                            {note.body} 
                        </p>
                    </div>
                </div>
            </div>

            {isModalVisible && <Modal toggleIsModalVisible={toggleIsModalVisible} deleteNote={() => props.deleteNote(note.id)}/>}
        </>
    );
}

export default NoteDetailsPage;
import React from "react";
import { Link } from "react-router-dom";
import { MdStickyNote2 } from 'react-icons/md';

function NoteCard(props) {

    // Chooses color
    const color = props.note.category == 'BUSINESS' ? 'blue'
        : (props.note.category == 'PERSONAL' ? 'green' : 'red');

    // Sets todays time or previous date
    const noteFullDate = new Date(props.note.updated_at)
    const noteDate = noteFullDate.toLocaleDateString('en-GB');
    const displayDate = (new Date()).toLocaleDateString('en-GB') != noteDate
        ? noteDate
        : noteFullDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });

    return (
        <div className='col-md-4'>
            <Link to={`/notes/${props.note.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className='card shadow' style={{
                    border: '2px solid #a7a7a7',
                    borderRadius: '10px',
                    borderTop: `4px solid ${color}`
                }}
                >
                    <div className="card-header pb-0" style={{ borderBottom: '1px solid #a7a7a7', backgroundColor: '#cdcdcd' }}>
                        <h5 className='card-title mb-0 fw-bold'> {props.note.title} </h5>
                        <div className='d-flex justify-content-between'>
                            <p className="note-date font-12 text-muted mb-1"> {displayDate} </p>
                            <small className="text-muted">
                                <MdStickyNote2 style={{ fontSize: "20px", color: color }} /> {props.note.category}
                            </small>
                        </div>
                    </div>
                    <div className='card-body' style={{ backgroundColor: '#dadada', borderRadius: '0 0 8px 8px' }}>
                        <p className='card-text text-truncate'> {props.note.body} </p>
                    </div>
                </div>
            </Link>
        </div>
    );

}

export default NoteCard;
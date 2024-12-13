import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote } from '../api';


function EditOrCreateNotePage(params) {

  const [note, setNote] = useState({ title: '', body: '', category: '' });

  if (!params.isCreate) {
    const { id } = useParams();

    useEffect(() => {
      const fetchNote = async (noteId) => {
        const resNote = await getNote(noteId);
        setNote(resNote);
      }

      fetchNote(id)

    }, [id]);
  }

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (note.title && note.body && note.category) {
      params.isCreate ? params.addNewNote(note) : params.updateNote(note);
      navigate('/');
    }
  }

  return (
    <div className='container w-50 mt-4 shadow-lg' style={{ backgroundColor: '#cdcdcd', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <h4 className='text-center pt-4 mb-3'> {params.isCreate ? 'New' : 'Edit'} Note </h4>
        <div className="mb-3">
          <label className="form-label">
            Title
          </label>
          <input
            className="form-control"
            placeholder="Enter note's title"
            value={note.title}
            style={{ backgroundColor: '#dadada', border: '0px' }}
            onChange={(event) => setNote(n => ({ ...n, title: event.target.value }))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Enter note's content"
            value={note.body}
            style={{ backgroundColor: '#dadada', border: '0px' }}
            onChange={(event) => setNote(n => ({ ...n, body: event.target.value }))}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Category
          </label>
          <select
            className="form-select"
            value={note.category}
            style={{ height: "40px", backgroundColor: '#dadada', border: '0px' }}
            onChange={(event) => setNote(n => ({ ...n, category: event.target.value }))}
          >
            <option value='' defaultValue disabled> Pick a category </option>
            <option value="BUSINESS"> BUSINESS </option>
            <option value="PERSONAL"> PERSONAL </option>
            <option value="IMPORTANT"> IMPORTANT </option>
          </select>
        </div>

        <button type='submit' className="btn btn-primary justify-content-center mb-2" style={{ width: "100%" }}>
          {params.isCreate ? 'Add' : 'Edit'} Note
        </button>
      </form>
    </div>
  );
}

export default EditOrCreateNotePage;
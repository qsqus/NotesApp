import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import EditOrCreateNotePage from "./pages/EditOrCreateNotePage";
import baseURL from './api';



function App() {

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [searchedText, setSearchedText] = useState('');

  
  const filteredNotes = filteredCategory 
  ? notes.filter(note => note.category.toLowerCase() === filteredCategory.toLowerCase())
  : notes;

  const sortedNotes = filteredNotes.sort((n1, n2) => {
    return new Date(n2.updated_at) - new Date(n1.updated_at);
  });

  const handleFilter = (category) => {
    setFilteredCategory(f => category);
  }

  const handleSearchText = (text) => {
    setSearchedText(s => text);
  }



  const getAllnotes = () => {
    setIsLoading(i => true);
    axios.get(baseURL)
      .then((response) => {
        setNotes(n => response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load notes", {theme: 'colored'});
        console.log(error.message);
      });
  }

  useEffect(() => {
    getAllnotes();
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}search/?search=${searchedText}`)
    .then((response) => {
      setNotes(n => response.data);
    })
    .catch((error) => {
      toast.error("Failed to create note", {theme: 'colored'});
    });
  }, [searchedText]);

  const addNewNote = (data) => {
    axios.post(baseURL, data)
      .then((response) => {
        getAllnotes();
        toast.success("Note created successfully", {theme: 'colored'} );
      })
      .catch((error) => {
        toast.error("Failed to create note", {theme: 'colored'});
        console.log(error.message);
      });
  }

  const updateNote = (data) => {
    axios.put(`${baseURL}${data.id}/`, data)
      .then((response) => {
        getAllnotes();
        toast.success("Note edited successfully", {theme: 'colored'} );
      })
      .catch((error) => {
        toast.error("Failed to edit note", {theme: 'colored'});
        console.log(error.message);
      });
  }

  const deleteNote = (id) => {
    axios.delete(`${baseURL}${id}/`)
    .then((response) => {
      getAllnotes();
      toast.success("Note deleted successfully", {theme: 'colored'} );
    })
    .catch((error) => {
      toast.error("Failed to delete note", {theme: 'colored'});
      console.log(error.message);
    });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout searchedText={searchedText} handleSearchText={handleSearchText} />}>
            <Route index element={<HomePage notes={sortedNotes} isLoading={isLoading} handleFilter={handleFilter} />} />
            <Route path='/new-note' element={<EditOrCreateNotePage addNewNote={addNewNote} isCreate={true} />} />
            <Route path='/edit-note/:id' element={<EditOrCreateNotePage updateNote={updateNote} isCreate={false} />} />
            <Route path='/notes/:id' element={<NoteDetailsPage deleteNote={deleteNote}/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

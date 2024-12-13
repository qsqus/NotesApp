import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import EditOrCreateNotePage from "./pages/EditOrCreateNotePage";
import { addNewNote, deleteNote, getNotes, login, updateNote, logout, searchNote } from './api';
import Login from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/RegisterPage";

function App() {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);
    const [filteredCategory, setFilteredCategory] = useState('');
    const [searchedText, setSearchedText] = useState('');

    useEffect(() => {
        setIsLoading(true);
        getAndSetNotes();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const handleSearchNote = async (text) => {
            const response = await searchNote(text);
            setNotes(response);
        }

        handleSearchNote(searchedText);

    }, [searchedText]);

    const filteredNotes = (filteredCategory && notes)
        ? notes.filter(note => note.category.toLowerCase() === filteredCategory.toLowerCase())
        : notes;

    const sortedNotes = filteredNotes
        ? filteredNotes.sort((n1, n2) => { return new Date(n2.updated_at) - new Date(n1.updated_at) })
        : notes;

    const handleFilter = (category) => {
        setFilteredCategory(category);
    }

    const handleSearchText = (text) => {
        setSearchedText(text);
    }

    const getAndSetNotes = async () => {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
    }

    const handleAddNewNote = async (data) => {
        const isSuccess = await addNewNote(data);

        if (isSuccess) {
            getAndSetNotes();
            toast.success("Note created successfully", { theme: 'colored' });
        } else {
            toast.error("Failed to create note", { theme: 'colored' });
        }

    }

    const handleUpdateNote = async (data) => {
        const isSuccess = await updateNote(data);

        if (isSuccess) {
            getAndSetNotes();

            toast.success("Note edited successfully", { theme: 'colored' });
        } else {
            toast.error("Failed to edit note", { theme: 'colored' });
        }

    }

    const handleDeleteNote = async (id) => {
        const isSuccess = await deleteNote(id);

        if (isSuccess) {
            getAndSetNotes();

            toast.success("Note deleted successfully", { theme: 'colored' });
        } else {
            toast.error("Failed to delete note", { theme: 'colored' });
        }
    }

    const handleLogout = async () => {
        const isSuccess = await logout();

        if (isSuccess) {
            setNotes([]);
        }
    }

    const handleLogin = async (username, password) => {
        const isSuccess = await login(username, password);

        if (isSuccess) {
            await getAndSetNotes();
        }
        return isSuccess;
    }

    return (
        <BrowserRouter>
            <AuthProvider handleLogin={handleLogin}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={
                        <PrivateRoute>
                            <MainPage searchedText={searchedText} handleSearchText={handleSearchText} handleLogout={handleLogout} />
                        </PrivateRoute>
                    }>

                        <Route index element={
                            <PrivateRoute>
                                <HomePage notes={sortedNotes} isLoading={isLoading} handleFilter={handleFilter} />
                            </PrivateRoute>
                        } />

                        <Route path='/new-note' element={
                            <PrivateRoute>
                                <EditOrCreateNotePage addNewNote={handleAddNewNote} isCreate={true} />
                            </PrivateRoute>
                        } />

                        <Route path='/edit-note/:id' element={
                            <PrivateRoute>
                                <EditOrCreateNotePage updateNote={handleUpdateNote} isCreate={false} />
                            </PrivateRoute>
                        } />

                        <Route path='/notes/:id' element={
                            <PrivateRoute>
                                <NoteDetailsPage deleteNote={handleDeleteNote} />
                            </PrivateRoute>
                        } />
                    </Route>
                </Routes>


            </AuthProvider >
        </BrowserRouter >
    );

}

export default App;

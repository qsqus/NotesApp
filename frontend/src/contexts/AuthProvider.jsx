import { createContext, useContext, useEffect, useState } from "react";
import { isUserAuthenticated, register } from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getAuthenticated = async () => {
        try {
            const isSuccess = await isUserAuthenticated();
            setIsAuthenticated(isSuccess);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

    const loginUser = async (username, password) => {
        const isSuccess = await props.handleLogin(username, password);
        if (isSuccess) {
            setIsAuthenticated(true);
            navigate('/');
        }
    }

    const registerUser = async (username, email, password, confirmedPassword) => {
        if (password === confirmedPassword) {
            try {
                await register(username, email, password);
                navigate('/login');
            } catch (error) {
                console.log('Register error');
            }

        } else {
            alert('Passwords are not a match');
        }
    }

    // Do this every time new page loads
    useEffect(() => {
        getAuthenticated();
    }, [window.location.pathname])

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, loginUser, registerUser }}>
            {props.children}``
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
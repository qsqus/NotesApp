import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const { registerUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        registerUser(username, email, password, confirmedPassword);
    }

    return (
        <div className='container w-25 mt-4 shadow-lg' style={{ backgroundColor: '#cdcdcd', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit}>
                <h4 className='text-center pt-4 mb-3'> Register </h4>
                <div className="mb-3">
                    <label className="form-label">
                        Username
                    </label>
                    <input
                        className="form-control"
                        placeholder="Enter your username"
                        type='text'
                        style={{ backgroundColor: '#dadada', border: '0px' }}
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Email
                    </label>
                    <input
                        className="form-control"
                        placeholder="Enter your email"
                        type='email'
                        style={{ backgroundColor: '#dadada', border: '0px' }}
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Password
                    </label>
                    <input
                        className="form-control"
                        placeholder="Enter your password"
                        type='password'
                        style={{ backgroundColor: '#dadada', border: '0px' }}
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Confirm password
                    </label>
                    <input
                        className="form-control"
                        placeholder="Enter your password again"
                        type='password'
                        style={{ backgroundColor: '#dadada', border: '0px' }}
                        onChange={(event) => setConfirmedPassword(event.target.value)}
                        value={confirmedPassword}
                    />
                </div>

                <button type='submit' className="btn btn-primary justify-content-center mb-2" style={{ width: "100%" }}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const {loginUser} = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(username, password);
  }

  return (
    <div className='container w-25 mt-4 shadow-lg' style={{ backgroundColor: '#cdcdcd', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <h4 className='text-center pt-4 mb-3'> Login </h4>
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

        <button type='submit' className="btn btn-primary justify-content-center mb-2" style={{ width: "100%" }}>
          Login
        </button>

        <Link to='/register'>
          <p className="pb-1">Register here</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try { 
          const response = await axios.post("http://localhost:3000/login", {username, password} )
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
            
        } catch (error) {
            console.log("error", error);
            
        }
    }
    
  return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
</div>
  )
}

export default Login


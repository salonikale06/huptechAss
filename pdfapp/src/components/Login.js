import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = `http://localhost:8080/api/login`;
        
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert(`Welcome to Website`);
                navigate('/Dashboard');
            } else {
                alert(data.message || "An error occurred while logging in.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert("An error occurred while processing your request.");
        }
    }

    return (
        <>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter your Email:</label>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Enter your Password:</label>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;

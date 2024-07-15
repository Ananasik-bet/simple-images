import React, { useState } from 'react';
import axios from 'axios';
import UsersTable from './UserTable';

const Main = () => {
    const [isAuth, setAuth] = useState(false);
    const [loginChoice, setLoginChoice] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            name: name,
            city: city,
            password: password
        };
        
        const formData = new FormData();
        formData.append('file', image);

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.data && result.data.accessToken) {
                const token = result.data.accessToken;
                setToken(token);

                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/images`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('User added successfully');
                setEmail('');
                setName('');
                setCity('');
                setImage(null);
                setAuth(true);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const data  = {
            'email': email,
            'password': password
        }

        try {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.data && result.data.accessToken) {
                setToken(result.data.accessToken);
                setAuth(true);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in');
        }
    };

    return (
        <div>
            {isAuth ? (
                <>
                    <button onClick={() => setAuth(false)}>Logout</button>
                    <button onClick={() => setLoginChoice(false)}>Show Users</button>
                    {!loginChoice && <UsersTable token={token} />}
                </>
            ) : (
                <>
                    <button onClick={() => setLoginChoice(true)}>Login</button>
                    <button onClick={() => setLoginChoice(false)}>Register</button>

                    {loginChoice ? (
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit}>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>City:</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Image:</label>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default Main;

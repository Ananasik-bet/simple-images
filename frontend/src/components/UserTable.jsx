import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = ({ token }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const sortedUsers = response.data;
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Images Count</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.city}</td>
                        <td>{user.images.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import "../components/User.css";

const UserData = () => {
    const url = `http://78.46.203.31:49160/api/customers`;
    const [customers, setCustomers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", phone: "", address: "" });
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get(url);
            console.log(response.data);
            setCustomers(response.data);
            setLoading(false); // Turn off loading spinner after data is fetched
        } catch (error) {
            console.log(error, "Error While Fetching User Data");
            toast.error("Error While Fetching User Data");
            setLoading(false); // Turn off loading spinner if there's an error
        }
    }

    async function addUser() {
        try {
            const response = await axios.post(url, newUser);
            console.log(response.data);
            setCustomers([...customers, response.data]);
            setNewUser({ name: "", phone: "", address: "" });
            toast.success('User Successfully Added');
        } catch (error) {
            console.log(error, "Error While Adding User Data");
            toast.error("Error While Adding User Data");
        }
    }

    async function deleteUser(id) {
        try {
            await axios.delete(`${url}/${id}`);
            console.log(`User with ID ${id} deleted`);
            setCustomers(customers.filter((customer) => customer.id !== id));
            toast.success('User Successfully Deleted');
        } catch (error) {
            console.log(error, "Error While Deleting User Data");
            toast.error("Error While Deleting User Data");
        }
    }

    async function updateUser() {
        try {
            const response = await axios.put(`${url}/${editingUser.id}`, editingUser);
            console.log(response.data);
            setCustomers(customers.map(customer => customer.id === editingUser.id ? editingUser : customer));
            setEditingUser(null);
            toast.success('User Successfully Updated');
        } catch (error) {
            console.log(error, "Error While Updating User Data");
            toast.error("Error While Updating User Data");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingUser) {
            setEditingUser({ ...editingUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const columns = [
        { name: 'ID', selector: "id", sortable: true },
        { name: 'Name', selector: "name", sortable: true },
        { name: 'Phone', selector: "phone", sortable: true },
        { name: 'Address', selector: "address", sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <button onClick={() => deleteUser(row.id)}>Delete</button>
                    <button onClick={() => handleEditUser(row)}>Edit</button>
                </>
            )
        }
    ];

    return (
        <>
            <ToastContainer />
            <div className="container">
                <h1>Practice User Data</h1>
                <h3>Add User</h3>
                <input
                    type="text"
                    placeholder="User Name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={newUser.address}
                    onChange={handleInputChange}
                />
                <button onClick={addUser}>Add User</button>

                {editingUser && (
                    <>
                        <input
                            type="text"
                            placeholder="User Name"
                            name="name"
                            value={editingUser.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={editingUser.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={editingUser.address}
                            onChange={handleInputChange}
                        />
                        <button onClick={updateUser}>Update User</button>
                    </>
                )}
                {loading ? (
                    <div className="spinner-container">
                        <BeatLoader color={"#007bff"} loading={loading} css={spinnerStyle} size={100} />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={customers}
                    />
                )}
            </div>
        </>
    );
}

const spinnerStyle = css`
    display: block;
    margin: 0 auto;
`;

export default UserData;

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ManagerModal from './Modals/CreateManagerModal';
import UpdateManagerModal from './Modals/EditManagerModal';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import React from 'react';

export default function Managers() {
    const [data, setData] = useState([])
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.log("Error getting token");
            return;
        }

        const decoded = jwtDecode(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role !== "Manager") {
            alert("You are not authorized!")
            navigate("/jobs");
        }
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/api/managers',
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: 'bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const result = await response.json();
            setData(result);
            console.log('data is set');
        }
        fetchData();

    }, []); // Run the effect (fetch in this case) only once when the component renders

    function addManager(newManager) {
        setData(prevData => [...prevData, newManager])
    }

    return (
        <main>
            <button onClick={() => setShowCreateModal(true)}>Create new manager</button>
            <h1>Managers</h1>
            {
                data ?
                    data.map(manager => (
                        <React.Fragment key={manager.managerId}>
                            <section className="manager">
                                <p className="managerId">{manager.managerId}</p>
                                <p className="managerName">{manager.firstName} {manager.lastName}</p>
                                <p className="managerEmail">{manager.email}</p>
                                <button className="updateBtn" onClick={
                                    () => {
                                        setShowUpdateModal(true);
                                        setSelectedManager(manager);
                                    }
                                }>Update Info</button>
                            </section>


                        </React.Fragment>
                    ))
                    : <p>Loading...</p>
            }

            {
                showCreateModal && createPortal(
                    <ManagerModal onClose={() => setShowCreateModal(false)} addManager={addManager} />, document.body
                )
            }

            {
                showUpdateModal && selectedManager && createPortal(
                    <UpdateManagerModal
                        onClose={() => setShowUpdateModal(false)}
                        managerId={selectedManager.managerId}
                        currentFirstName={selectedManager.firstName}
                        CurrentLastName={selectedManager.lastName}
                        CurrentEmail={selectedManager.email} />, document.body
                )
            }


        </main >
    )

}